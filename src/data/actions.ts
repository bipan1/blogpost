'use server';

// Every export of a 'use server' file is a publicly callable endpoint, so
// each action checks the session itself and validates all input.

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  checkPassword,
  createSession,
  deleteSession,
  isAdmin,
} from '@/lib/auth';
import {
  indexPost,
  isElasticsearchConfigured,
  removePostFromIndex,
} from '@/lib/elasticsearch';
import prisma from '@/lib/prisma';
import { DEFAULT_CATEGORY } from '@/lib/Constants';
import { parseCategory, toPlainText } from '@/lib/Helpers';
import type { PostInput } from '@/types/Post';

export type ActionResult = { error: string } | undefined;

const UNAUTHORIZED: ActionResult = {
  error: 'Your session has expired. Please sign in again.',
};

/** Only allow same-site relative redirects after login. */
const safeRedirectPath = (value: unknown) =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/admin';

export const login = async (
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> => {
  const password = formData.get('password');
  let valid = false;
  try {
    valid = typeof password === 'string' && checkPassword(password);
  } catch (error) {
    console.error(error);
    return { error: 'Sign-in is not configured on this server.' };
  }
  if (!valid) {
    // Slow down guessing; there is no shared store for real rate limiting.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: 'Incorrect password.' };
  }

  await createSession();
  redirect(safeRedirectPath(formData.get('next')));
};

export const logout = async () => {
  await deleteSession();
  redirect('/');
};

const parseInput = (input: PostInput) => {
  const title = input.title?.trim();
  const content = input.content ?? '';
  if (!title) return { error: 'Title is required.' } as const;
  if (!toPlainText(content) && !content.includes('<img')) {
    return { error: 'Content is required.' } as const;
  }
  return {
    data: {
      title,
      // Stored JSON-encoded to stay compatible with existing rows.
      content: JSON.stringify(content),
      keywords: (input.keywords ?? '').split(/\s+/).filter(Boolean),
      category: parseCategory(input.category) ?? DEFAULT_CATEGORY,
      published: input.published === true,
    },
  } as const;
};

/** Keeps search in step with the database. Failures are logged, not fatal. */
const syncSearchIndex = async (post: {
  id: number;
  title: string;
  published: boolean;
}) => {
  if (!isElasticsearchConfigured()) return;
  try {
    if (post.published) await indexPost(post);
    else await removePostFromIndex(post.id);
  } catch (error) {
    console.error('Failed to update the search index:', error);
  }
};

const revalidatePost = (id: number) => {
  revalidatePath('/');
  revalidatePath('/posts');
  revalidatePath(`/posts/${id}`);
  revalidatePath('/admin');
};

export const createPost = async (input: PostInput): Promise<ActionResult> => {
  if (!(await isAdmin())) return UNAUTHORIZED;
  const parsed = parseInput(input);
  if (!parsed.data) return { error: parsed.error };

  let post;
  try {
    post = await prisma.post.create({ data: parsed.data });
  } catch (error) {
    console.error('Failed to create post:', error);
    return { error: 'Failed to create the post. Please try again later.' };
  }

  await syncSearchIndex(post);
  revalidatePost(post.id);
  redirect('/admin');
};

export const updatePost = async (
  id: number,
  input: PostInput,
): Promise<ActionResult> => {
  if (!(await isAdmin())) return UNAUTHORIZED;
  if (!Number.isInteger(id)) return { error: 'Invalid post.' };
  const parsed = parseInput(input);
  if (!parsed.data) return { error: parsed.error };

  let post;
  try {
    post = await prisma.post.update({ where: { id }, data: parsed.data });
  } catch (error) {
    console.error('Failed to update post:', error);
    return { error: 'Failed to save the post. Please try again later.' };
  }

  await syncSearchIndex(post);
  revalidatePost(post.id);
  redirect('/admin');
};

export const deletePost = async (id: number): Promise<ActionResult> => {
  if (!(await isAdmin())) return UNAUTHORIZED;
  if (!Number.isInteger(id)) return { error: 'Invalid post.' };

  try {
    await prisma.post.delete({ where: { id } });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return { error: 'Failed to delete the post. Please try again later.' };
  }

  if (isElasticsearchConfigured()) {
    await removePostFromIndex(id).catch((error) =>
      console.error('Failed to update the search index:', error),
    );
  }
  revalidatePost(id);
};
