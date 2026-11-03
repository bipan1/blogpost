'use client';

import { useEffect } from 'react';
import Container from './components/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-semibold text-red-600">Error</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
        Something went wrong
      </h1>
      <p className="mt-4 text-zinc-600">
        Failed to load this page. Please try again later.
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-8">
        Try again
      </button>
    </Container>
  );
}
