import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

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

const Project = () => {
  return (
    <div className="bg-purple-950 pb-10">
      <div className="mt-20  p-10 mx-auto container">
        <h2 className="text-4xl text-white text-center mb-14">My Projects</h2>
        <div className="flex flex-wrap">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-purple-800 p-4 w-full sm:w-1/2 lg:w-1/4 rounded-2xl mr-10"
            >
              <div className="relative w-full h-[230px]">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-2xl"
                  width={500}
                  height={300}
                />
                <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                  <div className="mt-3 black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                    <div className="rounded-3xl bg-white border-4 border-black">
                      <a href={project.githubUrl}>
                        <FaGithub className="text-4xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 mb-4">
                <h3 className="text-white font-bold text-[24px]">
                  {project.title}
                </h3>
                <p className="text-white mt-2 text-secondary text-[14px]">
                  {project.description}
                </p>
              </div>
              <span className="text-red-500">#{project.keywords[0]} </span>
              <span className="text-green-500">#{project.keywords[1]} </span>
              <span className="text-blue-500">#{project.keywords[2]} </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
