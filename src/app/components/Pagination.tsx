import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { Category } from '@/lib/Constants';

interface PaginationProps {
  page: number;
  totalPages: number;
  category: Category;
}

const PageLink = ({
  page,
  category,
  disabled,
  children,
}: {
  page: number;
  category: Category;
  disabled: boolean;
  children: React.ReactNode;
}) =>
  disabled ? (
    <span
      aria-disabled
      className="btn-secondary pointer-events-none opacity-40"
    >
      {children}
    </span>
  ) : (
    <Link
      href={{ pathname: '/posts', query: { category, page } }}
      className="btn-secondary"
    >
      {children}
    </Link>
  );

const Pagination = ({ page, totalPages, category }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between gap-4"
    >
      <PageLink page={page - 1} category={category} disabled={page <= 1}>
        <HiArrowLeft aria-hidden="true" /> Previous
      </PageLink>

      <p className="text-sm text-zinc-500">
        Page <span className="font-medium text-zinc-900">{page}</span> of{' '}
        <span className="font-medium text-zinc-900">{totalPages}</span>
      </p>

      <PageLink
        page={page + 1}
        category={category}
        disabled={page >= totalPages}
      >
        Next <HiArrowRight aria-hidden="true" />
      </PageLink>
    </nav>
  );
};

export default Pagination;
