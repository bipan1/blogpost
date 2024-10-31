import Link from 'next/link';
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="p-4 border-b border-gray-200 shadow-sm">

      <div className="container mx-auto px-4 sm:px-16 lg:px-36 flex justify-between items-center">
        <div className=" ">
          <Link href="/">
            <div className='flex justify-between text-purple-600'>
              <LiaLaptopCodeSolid size={40} className='mr-5' />
              <span className='font-extrabold text-2xl mt-1'>Bipan Chhetri</span>
            </div>
          </Link>
        </div>
        
        <div className='flex'>
          <input className='h-8 border border-gray-200 rounded-md  w-full mr-2' />
          <FaSearch className='mt-1' size={20} color='gray'/>
        </div>

        <div className="flex space-x-6">
          <Link href="/posts">
            <span className="text-black font-bold hover:text-purple-500 cursor-pointer">Posts</span>
          </Link>
          <Link href="/about">
            <span className="text-black font-bold hover:text-purple-500 cursor-pointer">About Me</span>
          </Link>
          <Link href="/contact">
            <span className="text-black font-bold hover:text-purple-500 cursor-pointer">Contact Us</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;