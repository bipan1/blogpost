import Link from 'next/link';
import { CATEGORIES, Category } from '@/lib/Constants';

const TabBar = ({ category }: { category?: Category }) => (
  <nav
    aria-label="Categories"
    className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
  >
    <ul className="flex w-max gap-1 rounded-xl bg-zinc-100 p-1">
      {CATEGORIES.map((cat) => {
        const active = category === cat;
        return (
          <li key={cat}>
            <Link
              href={{ pathname: '/posts', query: { category: cat } }}
              aria-current={active ? 'page' : undefined}
              className={`block rounded-lg px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition ${
                active
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {cat}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default TabBar;
