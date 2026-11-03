import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import AdminOnly from '@/app/components/AdminOnly';
import Avatar from '@/app/components/Avatar';
import Container from '@/app/components/Container';
import ContentDisplay from '@/app/components/ContentDisplay';
import PostMeta from '@/app/components/PostMeta';
import { getPost } from '@/data/posts';
import { excerpt, extractFirstImage } from '@/lib/Helpers';

type Params = Promise<{ id: string }>;

// Incremental Static Regeneration: each post is rendered on its first request,
// then served from cache and refreshed in the background at most hourly.
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

const loadPost = async (params: Params) => {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const post = await getPost(id);
  if (!post) notFound();
  return post;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await loadPost(params);
  const description = excerpt(post.content, 160);
  const image = extractFirstImage(post.content) ?? '/images/profile.png';

  return {
    title: post.title,
    description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description,
      images: [{ url: image, alt: post.title }],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await loadPost(params);

  return (
    <Container>
      <article className="max-w-3xl pt-10 sm:pt-14">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={{ pathname: '/posts', query: { category: post.category } }}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900"
          >
            <HiArrowLeft
              className="transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            All {post.category} posts
          </Link>
          <AdminOnly>
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="btn-secondary py-1.5"
            >
              Edit post
            </Link>
          </AdminOnly>
        </div>

        <header className="mt-8 border-b border-zinc-200 pb-8">
          <PostMeta post={post} />
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl sm:leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar size={40} />
              <div className="text-sm">
                <p className="font-medium text-zinc-900">Bipan Chhetri</p>
                <p className="text-zinc-500">Software Engineer</p>
              </div>
            </div>
            {post.keywords.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {post.keywords.map((keyword) => (
                  <li key={keyword} className="chip">
                    {keyword}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        <div className="mt-10">
          <ContentDisplay html={post.content} />
        </div>
      </article>
    </Container>
  );
}
