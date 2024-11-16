import React from 'react';
import { FaSuitcase, FaGraduationCap } from 'react-icons/fa';

const Exprience = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto">
        <div className="relative mb-12">
          <div className="-z-10 absolute inset-0 flex items-center justify-start ml-6 lg:ml-0 lg:justify-center">
            <div className="w-1 bg-gray-300 h-full"></div>
          </div>
          <div className="text-lfet lg:text-center mb-12">
            <h2 className="text-3xl font-bold inline-block bg-gray-200 px-4 py-2 z-10">
              Work Experience
            </h2>
          </div>
          <ul className="list-none p-2 relative">
            <li className="mb-8 relative flex items-start lg:justify-start">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-900 text-white absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0">
                <FaSuitcase />
              </div>
              <div className="ml-16 lg:mr-32 w-full lg:w-5/12">
                <div className="mb-4 text-left lg:text-right">
                  <h3 className="text-xl font-bold">Software Engineer</h3>
                  <span className="company text-gray-600">
                    Fuse Machines, Nepal - Oct 2020 - May 2022
                  </span>
                </div>
                <ul className="list-disc">
                  <li className="mb-2">
                    Contributed to the Fuse Classroom platform, enabling
                    accessible online education, and Enhatch, a scalable SaaS
                    solution streamlining preoperative planning for medical
                    implants.
                  </li>
                  <li className="mb-2">
                    Gathered business requirements and implemented complex
                    logic, enhancing efficiency by automating over 30% of manual
                    tasks.
                  </li>
                  <li className="mb-2">
                    Actively participated in Agile methodologies (Scrum),
                    including sprint planning, daily stand-up meetings, and user
                    story refinement.
                  </li>
                  <li className="mb-2">
                    Increased code reliability by implementing automated testing
                    with Jest and React Testing Library, achieving a 95% test
                    coverage across key components.
                  </li>
                </ul>
              </div>
            </li>
            <li className="mb-8 relative flex items-start lg:justify-end">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-900 text-white absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0">
                <FaSuitcase />
              </div>
              <div className="ml-16 lg:ml-6 w-full lg:w-5/12">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Software Engineer</h3>
                  <span className="company text-gray-600">
                    Info Developers Pvt. Ltd. - Dec 2019 - Nov 2020
                  </span>
                </div>
                <ul className="list-disc">
                  <li className="mb-2">
                    Enhanced front-end efficiency by developing and maintaining
                    reusable React components, reducing new feature development
                    time by approximately 20%.
                  </li>
                  <li className="mb-2">
                    Built a React boilerplate for new projects, reducing setup
                    time and facilitating team onboarding for faster project
                    initiation.
                  </li>
                  <li className="mb-2">
                    Collaborated with backend engineers to design and implement
                    RESTful APIs, ensuring seamless frontend-backend integration
                    for an improved user experience.
                  </li>
                </ul>
              </div>
            </li>
            <li className="mb-8 relative flex items-start lg:justify-start">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-900 text-white absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0">
                <FaSuitcase />
              </div>
              <div className="ml-16 lg:mr-32 w-full lg:w-5/12">
                <div className="mb-4 text-left lg:text-right">
                  <h3 className="text-xl font-bold">
                    Software Engineer Intern
                  </h3>
                  <span className="company text-gray-600">
                    kEIV Pvt. Ltd. - Jun 2019 - Nov 2019
                  </span>
                </div>
                <ul className=" list-disc">
                  <li className="mb-2">
                    Solidified web development and JavaScript foundation through
                    hands-on experience with React, Redux, and Node.js projects,
                    gaining valuable knowledge applicable to different domains.
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <div className="text-lfet lg:text-center mb-12">
            <h2 className="text-3xl font-bold inline-block bg-gray-200 px-4 py-2">
              Education
            </h2>
          </div>
          <ul className="list-none p-2 relative">
            <li className="mb-8 relative flex items-start lg:justify-end">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-900 text-white absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0">
                <FaGraduationCap />
              </div>
              <div className="ml-16 lg:ml-6 w-full lg:w-5/12">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">
                    Masters Of Information Technology
                  </h3>
                  <span className="company text-gray-600">
                    APIC College, Melbourne - 2022 - present
                  </span>
                </div>
                <div className="">
                  <p>Masters Of Information Technology</p>
                </div>
              </div>
            </li>
            <li className="mb-8 relative flex items-start lg:justify-start">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-900 text-white absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0">
                <FaGraduationCap />
              </div>
              <div className="ml-16 lg:mr-32 w-full lg:w-5/12">
                <div className="mb-4 text-left lg:text-right">
                  <h3 className="text-xl font-bold">
                    Bachelors in Electronics and Communication Engineering
                  </h3>
                  <span className="company text-gray-600">
                    IOE, TU, Nepal - 2015 - 2019
                  </span>
                </div>
                <div className="text-left lg:text-right">
                  <p>Bachelors in Electronics and Communication Engineering</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Exprience;
