import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Grocery store',
    description:
      'Grocery Store E-Commerce Application! This project is a full-stack e-commerce platform built with Next.js for both the frontend and backend, utilizing AWS RDS for data storage, AWS S3 for image storage, and Redux for state management.',
    imageUrl: '/images/ecommerce.png',
    githubUrl: 'https://github.com/bipan1/eCommerce.git',
    keywords: ['Next.js', 'AWS', 'tailwind'],
  },
  {
    id: 2,
    title: 'Finance Manager',
    description:
      'A React.js and TypeScript-based web application that utilizes the FMP API to provide users with comprehensive financial data on various stocks. It allows users to view detailed financial data, manage their accounts, and create personal stock portfolios.',
    imageUrl: '/images/finance.png',
    githubUrl: 'https://github.com/bipan1/Finance-Project.git',
    keywords: ['React.js', 'dotnet', 'tailwind'],
  },
  {
    id: 3,
    title: 'Blog Post Application',
    description:
      'Our blog post application leverages the server-side rendering (SSR) and Suspense for seamless and efficient content delivery. By handling asynchronous tasks within server components, we eliminate the need for external APIs, ensuring a streamlined and secure data flow.',
    imageUrl: '/images/blogpost.png',
    githubUrl: 'https://github.com/bipan1/blogpost.git',
    keywords: ['Next.js', 'SSR', 'emailjs'],
  },
];

const Project = () => (
  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading" className="section-heading">
      Projects
    </h2>
    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id}>
          <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/5">
            <div className="aspect-[16/9] overflow-hidden border-b border-zinc-100 bg-zinc-50">
              <Image
                src={project.imageUrl}
                alt=""
                width={640}
                height={360}
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-semibold text-zinc-900">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0"
                >
                  {project.title}
                </a>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                {project.description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <ul className="flex flex-wrap gap-1.5">
                  {project.keywords.map((keyword) => (
                    <li key={keyword} className="chip">
                      {keyword}
                    </li>
                  ))}
                </ul>
                <FaGithub
                  className="shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-900"
                  size={18}
                  aria-label="View on GitHub"
                />
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  </section>
);

export default Project;
