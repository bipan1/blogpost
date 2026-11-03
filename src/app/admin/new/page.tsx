import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import Container from '../../components/Container';
import PageHeader from '../../components/PageHeader';
import PostForm from '../../components/PostFormLoader';

export const metadata: Metadata = {
  title: 'New post',
  robots: { index: false },
};

export default async function NewPostPage() {
  await requireAdmin('/admin/new');

  return (
    <Container>
      <PageHeader
        title="New post"
        description={
          <Link href="/admin" className="text-base font-medium text-violet-700">
            &larr; All posts
          </Link>
        }
      />
      <div className="max-w-3xl">
        <PostForm />
      </div>
    </Container>
  );
}
