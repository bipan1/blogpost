import Link from 'next/link';
import { LiaLaptopCodeSolid } from 'react-icons/lia';
import NavBarClient from './NavBarClient';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <nav className="p-4 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-16 lg:px-36 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex justify-between text-purple-600">
              <LiaLaptopCodeSolid size={40} className="mr-5" />
              <span className="font-extrabold text-2xl mt-1">
                Bipan Chhetri
              </span>
            </div>
          </Link>
        </div>

        <SearchBar />

        <div className="hidden sm:flex space-x-6">
          <Link href="/posts">
            <span className="text-black font-bold hover:text-purple-500 cursor-pointer">
              Posts
            </span>
          </Link>
          <Link href="/about">
            <span className="text-black font-bold hover:text-purple-500 cursor-pointer">
              About Me
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-black font-bold hover:text-purple-500 cursor-pointer">
              Contact Us
            </span>
          </Link>
        </div>
        <NavBarClient />
      </div>
    </nav>
  );
};

export default Navbar;
