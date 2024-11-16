export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  keywords: string[];
}

export interface Params {
  id: string;
}

export interface PostSubmitData {
  title: string;
  content: string;
  keywords: string;
}
