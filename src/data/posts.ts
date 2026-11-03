import 'server-only';
import { cache } from 'react';
import prisma from '@/lib/prisma';
import type { Post } from '@/generated/prisma/client';
import {
  autocompleteTitles,
  isElasticsearchConfigured,
  searchPostIds,
  type Suggestion,
} from '@/lib/elasticsearch';
import { Category, DEFAULT_CATEGORY, POST_LIMIT } from '@/lib/Constants';
import { formatDate, parseContent, readingTime } from '@/lib/Helpers';
import type { PostDisplay } from '@/types/Post';

// Errors are deliberately not caught here: they propagate to the nearest
// error.tsx boundary instead of being rendered as data.
//
// Public queries only ever return published posts; drafts are visible through
// the admin* queries, which callers must guard with requireAdmin().

const published = { published: true } as const;

const toDisplay = (post: Post): PostDisplay => {
  const content = parseContent(post.content);
  return {
    ...post,
    content,
    formattedDate: formatDate(post.createdAt),
    readingTime: readingTime(content),
  };
};

export const getPosts = async ({
  page = 1,
  category,
}: {
  page?: number;
  category?: Category;
}): Promise<PostDisplay[]> => {
  const posts = await prisma.post.findMany({
    where: category ? { ...published, category } : published,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * POST_LIMIT,
    take: POST_LIMIT,
  });
  return posts.map(toDisplay);
};

export const getTotalPages = async (
  category: Category = DEFAULT_CATEGORY,
): Promise<number> => {
  const count = await prisma.post.count({
    where: { ...published, category },
  });
  return Math.max(Math.ceil(count / POST_LIMIT), 1);
};

export const searchPosts = async (query: string): Promise<PostDisplay[]> => {
  // Without Elasticsearch (e.g. local development) fall back to a simple
  // case-insensitive title match.
  const where = isElasticsearchConfigured()
    ? { id: { in: await searchPostIds(query) } }
    : { title: { contains: query, mode: 'insensitive' as const } };

  const posts = await prisma.post.findMany({
    where: { ...published, ...where },
    orderBy: { createdAt: 'desc' },
  });
  return posts.map(toDisplay);
};

const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  );

/** Title suggestions with matches wrapped in <em>, like Elasticsearch. */
export const autocompletePosts = async (
  query: string,
  limit = 5,
): Promise<Suggestion[]> => {
  if (isElasticsearchConfigured()) return autocompleteTitles(query, limit);

  const posts = await prisma.post.findMany({
    where: { ...published, title: { contains: query, mode: 'insensitive' } },
    select: { id: true, title: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  const lower = query.toLowerCase();
  return posts.map(({ id, title }) => {
    const start = title.toLowerCase().indexOf(lower);
    if (start < 0) return { id: String(id), text: [escapeHtml(title)] };
    const end = start + query.length;
    return {
      id: String(id),
      text: [
        escapeHtml(title.slice(0, start)) +
          '<em>' +
          escapeHtml(title.slice(start, end)) +
          '</em>' +
          escapeHtml(title.slice(end)),
      ],
    };
  });
};

/** Cached per request so generateMetadata and the page share one query. */
export const getPost = cache(async (id: number) => {
  const post = await prisma.post.findUnique({ where: { id, ...published } });
  return post ? toDisplay(post) : null;
});

/** Every post including drafts, newest first. Admin only. */
export const adminGetPosts = async (): Promise<PostDisplay[]> => {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return posts.map(toDisplay);
};

/** A single post including drafts. Admin only. */
export const adminGetPost = async (id: number) => {
  const post = await prisma.post.findUnique({ where: { id } });
  return post ? toDisplay(post) : null;
};
