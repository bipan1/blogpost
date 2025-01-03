'use server'; //All async function in this file are Api endpoints.

import { PostDbSubmitData } from '../types/Post';
import prisma from '../lib/prisma';
import { Category, POST_LIMIT } from '@/lib/Constants';

export const createPost = async (
  data: PostDbSubmitData,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        keywords: data.keywords,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to create post:', error);
    return {
      success: false,
      error: 'Failed to create the post. Please try again later.',
    };
  }
};

export const fetchTotalPages = async (
  category: Category = Category.WebDev,
): Promise<number> => {
  try {
    const totalCount = await prisma.post.count({
      where: {
        category: {
          equals: category,
        },
      },
    });
    return Math.max(Math.ceil(totalCount / POST_LIMIT), 1);
  } catch (error) {
    console.error('Failed to fetch total post count:', error);
    return 0;
  }
};
