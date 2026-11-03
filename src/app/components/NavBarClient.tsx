'use client';

import { useEffect, useState } from 'react';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import Link from 'next/link';
import AdminOnly from './AdminOnly';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';

/** Mobile menu: a panel under the header with search and links. */
const NavBarClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="-mr-2 rounded-lg p-2 text-zinc-700 hover:bg-zinc-100"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <HiX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-x-0 top-16 bottom-0 bg-zinc-900/20 backdrop-blur-xs"
            onClick={close}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 border-b border-zinc-200 bg-white px-5 pt-4 pb-6 shadow-lg"
          >
            <SearchBar onNavigate={close} />
            <nav aria-label="Mobile" className="mt-4">
              <NavLinks vertical onNavigate={close} />
              <AdminOnly>
                <Link
                  href="/admin"
                  onClick={close}
                  className="mt-1 block rounded-lg px-3 py-2 text-base font-medium text-violet-700 hover:bg-zinc-50"
                >
                  Admin
                </Link>
              </AdminOnly>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBarClient;
