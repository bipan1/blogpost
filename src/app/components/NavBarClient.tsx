'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const NavBarClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-purple-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-gray-500 bg-opacity-75"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <div className="relative flex h-full w-full max-w-md flex-col bg-gray-900 shadow-xl">
            <div className="flex justify-center py-4">
              <h2
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-2xl font-bold text-white"
                id="slide-over-title"
              >
                Bipan Chhetri
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close panel</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center text-white">
              <Link
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                href="/posts"
                className="mb-4 border-b border-green-800 py-2"
              >
                <span className="font-bold hover:text-purple-500 cursor-pointer">
                  Posts
                </span>
              </Link>
              <Link
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                href="/about"
                className="mb-4 border-b border-green-800 py-2"
              >
                <span className="font-bold hover:text-purple-500 cursor-pointer">
                  About Me
                </span>
              </Link>
              <Link
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                href="/contact"
                className="border-b border-green-800 py-2"
              >
                <span className="font-bold hover:text-purple-500 cursor-pointer">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarClient;
