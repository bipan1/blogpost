'use server'; //All async function in this file are Api endpoints.

import { PostDbSubmitData } from '../types/Post';
import prisma from '../lib/prisma';

export const createPost = async (
  data: PostDbSubmitData,
): Promise<{ success: boolean; error?: string }> => {
  // Need to handle user authorization here before accessing the function.
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
