// Functions to fetch data in server components.
import { PostDisplay } from '../types/Post';
import prisma from '../lib/prisma';
import { formatDate } from '@/lib/Helpers';

export const fetchPosts = async (
  page: number = 1,
  limit: number = 4,
): Promise<PostDisplay[] | { error: string }> => {
  try {
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
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

export const fetchTotalPages = async (): Promise<number> => {
  try {
    const totalCount = await prisma.post.count();
    return Math.ceil(totalCount / 4);
  } catch (error) {
    console.error('Failed to fetch total post count:', error);
    return 0;
  }
};
