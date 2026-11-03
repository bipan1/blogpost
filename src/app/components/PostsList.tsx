import Link from 'next/link';
import { excerpt } from '@/lib/Helpers';
import type { PostDisplay } from '@/types/Post';
import PostMeta from './PostMeta';

const EXCERPT_LENGTH = 200;

const PostsList = ({
  posts,
  emptyMessage = 'No Posts Available.',
}: {
  posts: PostDisplay[];
  emptyMessage?: string;
}) => {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center">
        <p className="font-medium text-zinc-900">{emptyMessage}</p>
        <p className="mt-1 text-sm text-zinc-500">Check back soon.</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id} className="flex">
          <article className="group relative flex w-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/5 sm:p-6">
            <PostMeta post={post} />
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-violet-700 sm:text-xl">
              {/* Stretched link: the whole card is clickable. */}
              <Link
                href={`/posts/${post.id}`}
                className="after:absolute after:inset-0 after:rounded-2xl"
              >
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 flex-1 leading-relaxed text-zinc-600">
              {excerpt(post.content, EXCERPT_LENGTH)}
            </p>
            {post.keywords.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {post.keywords.map((keyword) => (
                  <li key={keyword} className="chip">
                    {keyword}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
