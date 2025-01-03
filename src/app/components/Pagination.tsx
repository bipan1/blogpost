import { fetchTotalPages } from '@/data/Action';
import { Category } from '@/lib/Constants';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
  page: number;
  category?: Category;
}

const Pagination: React.FC<PaginationProps> = async ({
  page,
  category = Category.WebDev,
}) => {
  const totalPages = await fetchTotalPages(category);

  return (
    <div className="flex items-center justify-center gap-8 w-full lg:w-1/2 mx-auto mt-10">
      <Link
        href={`/posts/?page=${page + -1}?category=${category}`}
        className={`rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
          ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
        type="button"
      >
        <FaArrowLeft className="w-4 h-4" />
      </Link>

      <p className="text-slate-600 flex-grow text-center">
        Page <strong className="text-slate-800">{page}</strong> of{' '}
        <strong className="text-slate-800">{totalPages}</strong>
      </p>

      <Link
        href={`/posts/?page=${page + 1}?category=${category}`}
        className={`rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
        ${page === totalPages ? 'pointer-events-none opacity-50' : ''}}`}
        type="button"
      >
        <FaArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default Pagination;
