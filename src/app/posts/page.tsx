import { Suspense } from 'react';
import PostsList from '../components/PostsList';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { fetchTotalPages } from '@/data/Post';

interface SearchParams {
  page?: string;
}

const PostsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const limit = 4;
  const page = parseInt(searchParams.page as string, 10) || 1;
  const totalPages = await fetchTotalPages();

  return (
    <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<Spinner />}>
        <PostsList page={page} limit={limit} />
        <Pagination page={page} totalPages={totalPages} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
