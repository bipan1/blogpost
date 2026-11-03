import { Suspense } from 'react';
import Link from 'next/link';
import { connection } from 'next/server';
import { HiArrowRight } from 'react-icons/hi';
import { getPosts } from '@/data/posts';
import Avatar from './components/Avatar';
import Container from './components/Container';
import PostListSkeleton from './components/PostListSkeleton';
import PostsList from './components/PostsList';

async function RecentPosts() {
  // Render per request: the intro above is static, posts stream in.
  await connection();
  const posts = await getPosts({ page: 1 });
  return <PostsList posts={posts} />;
}

export default function Home() {
  return (
    <Container>
      <section className="max-w-2xl pt-8 pb-14 sm:pt-12">
        <Avatar size={64} className="ring-4 ring-white shadow-md" />
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Hi, I&apos;m Bipan{' '}
          <span className="inline-block origin-[70%_70%] motion-safe:animate-[wave_2s_ease-in-out_1]">
            👋
          </span>
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-zinc-800">
          I&apos;m a full-stack Software Engineer specialising in React, Node.js
          and AWS, currently building digital lending products at Nimo
          Industries in Melbourne.
        </p>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-600">
          <p>
            I work across the stack, from server-rendered React and Next.js
            front ends to RESTful and GraphQL APIs and serverless services on
            AWS. I care about clean code, automated testing and reliable CI/CD,
            and I&apos;m an AWS Certified Developer&nbsp;–&nbsp;Associate.
          </p>
          <p>
            This site is where I write about what I&apos;m learning and
            building. Browse the latest articles below, or read more about my
            experience and projects.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/posts" className="btn-primary">
            Read the blog
          </Link>
          <Link href="/about" className="btn-secondary">
            About me
          </Link>
        </div>
      </section>

      <section aria-labelledby="recent-heading">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 id="recent-heading" className="section-heading">
            Recently published
          </h2>
          <Link
            href="/posts"
            className="group inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-900"
          >
            View all posts
            <HiArrowRight
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
        <Suspense fallback={<PostListSkeleton />}>
          <RecentPosts />
        </Suspense>
      </section>
    </Container>
  );
}
