import { MdWavingHand } from 'react-icons/md';
import PostsList from './components/PostsList';
import { Suspense } from 'react';
import Spinner from './components/Spinner';
import { fetchPosts } from '@/data/Post';
import Link from 'next/link';

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
      <div className="flex mb-2">
        <MdWavingHand size={40} color="#e0ac69" className="mr-2" />
        <span className="mt-2 text-purple-900 font-extrabold text-2xl">
          I&apos;m Bipan,
        </span>
      </div>
      <div className="text-lg text-gray-700">
        I&apos;m a Software Engineer with 3 years of experience in full-stack
        web development, specialising in React and Node.js. Skilled in MVC
        frameworks, RESTful and GraphQL services, and equipped with the latest
        advancements in the JavaScript and React ecosystem, including
        Server-Side Rendering (SSR) and modern web practices. Experienced with
        Agile methodologies, AWS, CI/CD, and automated testing. I&apos;m an AWS
        Certified Developer Associate, demonstrating expertise in cloud
        computing and scalable application deployment.
      </div>

      <div className="text-lg text-gray-700 mt-4">
        Welcome to my website, where I share my tech articles and insights.
        Here, you can explore my experience and projects, showcasing the work
        I&apos;ve done across various roles and technologies.
      </div>

      <h2 className="mt-6 text-2xl font-bold text-purple-900 mb-5 ">
        Recently Published
      </h2>

      {'error' in posts ? (
        <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
          <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
          <p className="text-red-500">{posts.error}</p>
        </div>
      ) : (
        <Suspense fallback={<Spinner />}>
          <PostsList page={1} />
          <Link href={'/posts'}>
            <div className="p-2 mt-3 lg:w-1/2 border-2 border-purple-600 rounded-xl text-center hover:bg-purple-400 hover:text-white">
              <p className="font-bold text-lg">View all posts</p>
            </div>
          </Link>
        </Suspense>
      )}
    </div>
  );
}
