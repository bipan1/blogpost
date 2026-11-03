import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getPosts, getTotalPages, searchPosts } from '@/data/posts';
import { Category, DEFAULT_CATEGORY } from '@/lib/Constants';
import { parseCategory, parsePage } from '@/lib/Helpers';
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import PostListSkeleton from '../components/PostListSkeleton';
import PostsList from '../components/PostsList';
import TabBar from '../components/TabBar';

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Articles on web development, tech, gadgets and more.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

async function CategoryPosts({
  page,
  category,
}: {
  page: number;
  category: Category;
}) {
  const [posts, totalPages] = await Promise.all([
    getPosts({ page, category }),
    getTotalPages(category),
  ]);
  return (
    <>
      <PostsList posts={posts} emptyMessage={`No ${category} posts yet.`} />
      <Pagination page={page} totalPages={totalPages} category={category} />
    </>
  );
}

async function SearchResults({ query }: { query: string }) {
  const posts = await searchPosts(query);
  return <PostsList posts={posts} emptyMessage="No posts match your search." />;
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search.trim() : '';
  const page = parsePage(params.page);
  const category = parseCategory(params.category) ?? DEFAULT_CATEGORY;

  if (search) {
    return (
      <Container>
        <PageHeader
          title={<>Results for &ldquo;{search}&rdquo;</>}
          description={
            <Link
              href="/posts"
              className="text-base font-medium text-violet-700 hover:text-violet-900"
            >
              &larr; Back to all posts
            </Link>
          }
        />
        <Suspense key={search} fallback={<PostListSkeleton />}>
          <SearchResults query={search} />
        </Suspense>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        title="Blog"
        description="Notes and articles on web development, tech and everything in between."
      />
      <div className="mb-6">
        <TabBar category={category} />
      </div>
      {/* Keyed so the fallback shows again when switching tab or page. */}
      <Suspense key={`${category}-${page}`} fallback={<PostListSkeleton />}>
        <CategoryPosts page={page} category={category} />
      </Suspense>
    </Container>
  );
}
