import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/Constants';

const categories = [
  'WebDev',
  'Tech',
  'Gadgets',
  'Finance',
  'Politics',
  'Random',
];

interface TabBarProps {
  category?: Category;
}

const TabBar: React.FC<TabBarProps> = ({ category = Category.WebDev }) => {
  return (
    <div className="flex space-x-4 border-b mb-5">
      {categories.map((cat) => (
        <Link
          href={`/posts/?category=${cat}`}
          key={cat}
          className={`pb-2 border-b-2 px-3 ${
            category === cat
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-500'
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
};

export default TabBar;
