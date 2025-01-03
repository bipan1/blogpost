import { PostDisplay } from '../types/Post';
import prisma from '../lib/prisma';
import { formatDate } from '@/lib/Helpers';
import { Category, POST_LIMIT } from '@/lib/Constants';
import axios from 'axios';

export const fetchPosts = async (
  page: number = 1,
  search: string | undefined,
  category: Category = Category.WebDev,
): Promise<PostDisplay[] | { error: string }> => {
  try {
    const skip = (page - 1) * POST_LIMIT;

    if (search) {
      const response = await axios.get(
        `${process.env.API_ENDPOINT}api/search`,
        {
          params: { q: search, page },
        },
      );

      const postIds = response.data.map((id: string) => parseInt(id));
      const posts = await prisma.post.findMany({
        where: {
          id: {
            in: postIds,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return posts.map((post) => ({
        ...post,
        formattedDate: formatDate(post.createdAt),
      }));
    } else {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: POST_LIMIT,
        where: {
          category: {
            equals: category,
          },
        },
      });

      return posts.map((post) => ({
        ...post,
        formattedDate: formatDate(post.createdAt),
      }));
    }
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
