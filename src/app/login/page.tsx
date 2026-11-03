import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import Container from '../components/Container';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const { next } = await searchParams;
  const returnTo =
    typeof next === 'string' && next.startsWith('/') && !next.startsWith('//')
      ? next
      : '/admin';

  if (await isAdmin()) redirect(returnTo);

  return (
    <Container className="flex justify-center py-16 sm:py-24">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Admin sign in
        </h1>
        <p className="mt-2 mb-6 text-zinc-600">
          Sign in to write and manage posts.
        </p>
        <LoginForm next={returnTo} />
      </div>
    </Container>
  );
}
