import type { Post } from '@/generated/prisma/client';

export type { Post };

/** A post with its content decoded to HTML and display fields precomputed. */
export interface PostDisplay extends Post {
  formattedDate: string;
  readingTime: number;
}

export interface PostInput {
  title: string;
  /** HTML from the editor. */
  content: string;
  /** Space-separated keywords. */
  keywords: string;
  category: string;
  published: boolean;
}
