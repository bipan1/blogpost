// Functions to fetch data in server components.
import { PostDisplay } from '../types/Post';
import prisma from '../lib/prisma';
import { formatDate } from '@/lib/Helpers';

export const fetchPosts = async (): Promise<
  PostDisplay[] | { error: string }
> => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post) => ({
      ...post,
      formattedDate: formatDate(post.createdAt),
    }));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return { error: 'Failed to load posts. Please try again later.' };
  }
};

export const fetchPost = async (
  id: number,
): Promise<PostDisplay | { error: string }> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      throw new Error('Post not found');
    }
    return {
      ...post,
      formattedDate: formatDate(post.createdAt),
    };
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return { error: 'Failed to load the post. Please try again later.' };
  }
};
