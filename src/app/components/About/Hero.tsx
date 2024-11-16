import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Hero = () => {
  return (
    <header
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/cover_bg_3.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="text-center">
          <div
            className="w-44 h-44 relative z-10 mx-auto rounded-full bg-cover bg-center mb-8"
            style={{ backgroundImage: 'url("/images/profile.png")' }}
          ></div>
          <h1
            className="text-5xl font-kaushan text-white italic mb-8"
            style={{ transform: 'rotate(-5deg)' }}
          >
            <span className="relative inline-block px-4 py-2 before:absolute before:top-[40px] before:left-0 before:w-[30px] before:h-[4px] before:bg-white before:-ml-[30px] after:absolute after:top-[40px] after:right-0 after:w-[30px] after:h-[4px] after:bg-white after:-mr-[30px]">
              Bipan Chhetri
            </span>
          </h1>
          <h3 className="text-2xl text-white mb-6 font-kaushan relative z-10">
            Javascript Developer
          </h3>
          <ul className="flex justify-center space-x-4 mt-4 relative z-10">
            <li>
              <a
                href="https://github.com/bipan1"
                className="text-white hover:text-gray-300"
              >
                <FaGithub className="text-2xl" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bipan-chhetri-08bbb3201/"
                className="text-white hover:text-gray-300"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/bipan.chhetri.90"
                className="text-white hover:text-gray-300"
              >
                <FaFacebook className="text-2xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Hero;
