'use client';
import { fetchTotalPages } from '@/data/Action';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({ page }) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const getTotalPages = async () => {
      const pages = await fetchTotalPages();
      setTotalPages(pages);
    };

    getTotalPages();
  }, [])

  const handlePageChange = (newPage: number) => {
    router.push(`/posts?page=${newPage}`);
  };

  return (
    <div className="flex items-center justify-center gap-8 w-full lg:w-1/2 mx-auto mt-10">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <FaArrowLeft className="w-4 h-4" />
      </button>

      <p className="text-slate-600 flex-grow text-center">
        Page <strong className="text-slate-800">{page}</strong> of{' '}
        <strong className="text-slate-800">{totalPages}</strong>
      </p>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <FaArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
