import { MdWavingHand } from 'react-icons/md';
import PostsList from './components/PostsList';
import prisma from '@/lib/prisma';
import { Suspense } from 'react';
import Spinner from './components/Spinner';

const fetchPosts = async () => {
  const posts = await prisma.post.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
};

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
      <Suspense fallback={<Spinner />}>
        <PostsList posts={posts} />
      </Suspense>
    </div>
  );
}
