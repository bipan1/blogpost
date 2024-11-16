import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const About = () => {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-start px-4 lg:px-0">
        <div className="w-full lg:w-1/3 mb-10 lg:mb-0 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>

          <div className="flex flex-row lg:flex-row">
            <ul className="space-y-4 text-lg mr-10">
              <li>
                <strong className="font-semibold">Full Name:</strong>
              </li>
              <li>
                <strong className="font-semibold">Phone:</strong>
              </li>
              <li>
                <strong className="font-semibold">Email:</strong>
              </li>
              <li>
                <strong className="font-semibold">Address:</strong>
              </li>
            </ul>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>Bipan Chhetri</li>
              <li>+61 414 271 497</li>
              <li>bipan13345@gmail.com</li>
              <li>Laverton, Victoria, Australia</li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-2/3 lg:pl-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10">
            Hello There!
          </h3>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-700">
            This is Bipan Chhetri. I am an innovative and dedicated JavaScript
            developer with 3 years of hands-on experience in the dynamic realm
            of web development. Specializing in crafting immersive and
            responsive user interfaces using React, while also possessing
            proficiency in backend technologies such as Node.js and AWS
            services.
          </p>
          <p className="text-base sm:text-lg mb-6 text-gray-700">
            My journey in software engineering has seen me contribute to diverse
            projects, collaborating with multidisciplinary teams to deliver
            robust applications. With a passion for clean code, best practices,
            and continuous learning, I am excited to bring my technical
            expertise to a forward-thinking company that values creativity,
            innovation, and growth.
          </p>

          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.linkedin.com/in/bipan-chhetri-08bbb3201/"
              className="text-gray-800 hover:text-gray-600"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://github.com/bipan1"
              className="text-gray-800 hover:text-gray-600"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/bipan.chhetri.90"
              className="text-gray-800 hover:text-gray-600"
            >
              <FaFacebook className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
