import type { Metadata } from 'next';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi';
import { adminGetPosts } from '@/data/posts';
import { logout } from '@/data/actions';
import { requireAdmin } from '@/lib/auth';
import Container from '../components/Container';
import DeletePostButton from './DeletePostButton';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false },
};

export default async function AdminPage() {
  await requireAdmin('/admin');
  const posts = await adminGetPosts();
  const drafts = posts.filter((post) => !post.published).length;

  return (
    <Container>
      <header className="flex flex-wrap items-end justify-between gap-4 pt-10 pb-8 sm:pt-12">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Posts
          </h1>
          <p className="mt-2 text-zinc-600">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            {drafts > 0 && ` · ${drafts} ${drafts === 1 ? 'draft' : 'drafts'}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <form action={logout}>
            <button type="submit" className="btn-secondary">
              Sign out
            </button>
          </form>
          <Link href="/admin/new" className="btn-primary">
            <HiPlus aria-hidden="true" /> New post
          </Link>
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center">
          <p className="font-medium text-zinc-900">No posts yet.</p>
          <Link
            href="/admin/new"
            className="mt-3 inline-block text-sm font-medium text-violet-700"
          >
            Write your first post &rarr;
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {post.published ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-600/20">
                      Draft
                    </span>
                  )}
                  <span className="text-xs text-zinc-500">
                    {post.category} · {post.formattedDate}
                  </span>
                </div>
                <p className="mt-1 truncate font-medium text-zinc-900">
                  {post.title}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                {post.published && (
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
                  >
                    View
                  </Link>
                )}
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-sm font-medium text-violet-700 hover:text-violet-900"
                >
                  Edit
                </Link>
                <DeletePostButton id={post.id} title={post.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
