import { Suspense } from 'react';
import PostsList from '../components/PostsList';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import TabBar from '../components/TabBar';
import { convertToCategory } from '@/lib/Helpers';

interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
}

const PostsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page as string, 10) || 1;
  const search = searchParams.search || '';
  const categoryParam = convertToCategory(searchParams.category || 'WebDev');

  return (
    <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <TabBar category={categoryParam} />
      <Suspense fallback={<Spinner />}>
        <PostsList page={page} search={search} category={categoryParam} />
        <Pagination page={page} category={categoryParam} />
      </Suspense>
    </div>
  );
};

export default PostsPage;
