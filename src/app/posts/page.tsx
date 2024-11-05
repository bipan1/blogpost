import { Suspense } from 'react';
import prisma from '../../lib/prisma';
import PostsList from '../components/PostsList';

const fetchPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

const PostsPage = async () => {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList posts={posts} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
