import Link from 'next/link';
import Container from './components/Container';

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-semibold text-violet-700">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-zinc-600">
        The page or post you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/posts" className="btn-primary">
          Browse all posts
        </Link>
        <Link href="/" className="btn-secondary">
          Go home
        </Link>
      </div>
    </Container>
  );
}
