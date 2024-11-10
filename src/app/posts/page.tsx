import { Suspense } from 'react';
import prisma from '../../lib/prisma';
import PostsList from '../components/PostsList';
import Spinner from '../components/Spinner';

const fetchPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
};

const PostsPage = async () => {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<Spinner />}>
        <PostsList posts={posts} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
