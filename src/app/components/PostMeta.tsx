import type { PostDisplay } from '@/types/Post';

/** Category · date · reading time. */
const PostMeta = ({
  post,
}: {
  post: Pick<
    PostDisplay,
    'category' | 'createdAt' | 'formattedDate' | 'readingTime'
  >;
}) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-500">
    <span className="font-medium text-violet-700">{post.category}</span>
    <span aria-hidden="true">·</span>
    <time dateTime={post.createdAt.toISOString()}>{post.formattedDate}</time>
    <span aria-hidden="true">·</span>
    <span>{post.readingTime} min read</span>
  </p>
);

export default PostMeta;
