const PostListSkeleton = ({ count = 4 }: { count?: number }) => (
  <div role="status" className="grid gap-4 lg:grid-cols-2">
    <span className="sr-only">Loading posts...</span>
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
      >
        <div className="h-3.5 w-48 rounded-sm bg-zinc-100" />
        <div className="mt-3 h-5 w-2/3 rounded-sm bg-zinc-200" />
        <div className="mt-4 space-y-2">
          <div className="h-3.5 rounded-sm bg-zinc-100" />
          <div className="h-3.5 w-5/6 rounded-sm bg-zinc-100" />
        </div>
        <div className="mt-5 flex gap-1.5">
          <div className="h-5 w-12 rounded-md bg-zinc-100" />
          <div className="h-5 w-14 rounded-md bg-zinc-100" />
        </div>
      </div>
    ))}
  </div>
);

export default PostListSkeleton;
