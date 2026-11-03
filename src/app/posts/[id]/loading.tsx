import Container from '@/app/components/Container';

export default function Loading() {
  return (
    <Container>
      <div role="status" className="max-w-3xl animate-pulse pt-10 sm:pt-14">
        <span className="sr-only">Loading post...</span>
        <div className="h-4 w-32 rounded-sm bg-zinc-100" />
        <div className="mt-8 h-4 w-56 rounded-sm bg-zinc-100" />
        <div className="mt-4 h-9 w-4/5 rounded-sm bg-zinc-200" />
        <div className="mt-6 flex items-center gap-3 border-b border-zinc-200 pb-8">
          <div className="h-10 w-10 rounded-full bg-zinc-200" />
          <div className="h-4 w-28 rounded-sm bg-zinc-100" />
        </div>
        <div className="mt-10 space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-4 rounded-sm bg-zinc-100" />
          ))}
        </div>
      </div>
    </Container>
  );
}
