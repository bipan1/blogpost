'use server'; //All async function in this file are Api endpoints.

import { PostDbSubmitData } from '../types/Post';
import prisma from '../lib/prisma';
import { POST_LIMIT } from '@/lib/Constants';
import client from '@/lib/elasticsearch';

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


// Fetches the total number of posts for pagination.
export const fetchTotalPages = async (): Promise<number> => {
  try {
    const totalCount = await prisma.post.count();
    return Math.ceil(totalCount / POST_LIMIT);
  } catch (error) {
    console.error('Failed to fetch total post count:', error);
    return 0;
  }
};


// Elastic search function
// export const elasticSearch = async (query : string) : Promise<string> => {
//   try {
//     const result = await client.search({
//       index: 'your_index_name', // Replace with your Elasticsearch index
//       body: {
//         query: {
//           match: { title: query }, // Replace 'title' with your searchable field
//         },
//       },
//     });

//     return result.body.hits.hits
//   } catch (error) {
//     console.error(error);
//   }
// }