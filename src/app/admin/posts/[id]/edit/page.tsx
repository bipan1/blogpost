import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminGetPost } from '@/data/posts';
import { requireAdmin } from '@/lib/auth';
import Container from '@/app/components/Container';
import PageHeader from '@/app/components/PageHeader';
import PostForm from '@/app/components/PostFormLoader';

export const metadata: Metadata = {
  title: 'Edit post',
  robots: { index: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  await requireAdmin(`/admin/posts/${rawId}/edit`);

  const id = Number(rawId);
  const post = Number.isInteger(id) ? await adminGetPost(id) : null;
  if (!post) notFound();

  return (
    <Container>
      <PageHeader
        title="Edit post"
        description={
          <Link href="/admin" className="text-base font-medium text-violet-700">
            &larr; All posts
          </Link>
        }
      />
      <div className="max-w-3xl">
        <PostForm
          post={{
            id: post.id,
            title: post.title,
            content: post.content,
            keywords: post.keywords.join(' '),
            category: post.category,
            published: post.published,
          }}
        />
      </div>
    </Container>
  );
}
