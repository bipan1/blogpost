import { Suspense } from 'react';
import PostsList from '../components/PostsList';
import Spinner from '../components/Spinner';
import { fetchPosts } from '@/data/Post';

const PostsPage = async () => {
  const posts = await fetchPosts();

  if ('error' in posts) {
    return (
      <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <p className="text-red-500">{posts.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<Spinner />}>
        <PostsList posts={posts} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
