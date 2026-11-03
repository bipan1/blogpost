import Link from 'next/link';
import Container from './Container';
import NavBarClient from './NavBarClient';
import AdminOnly from './AdminOnly';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';

const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md">
    <Container className="flex h-16 items-center justify-between gap-4">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2.5 font-semibold tracking-tight text-zinc-900"
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-xs font-semibold tracking-tight text-white"
        >
          BC
        </span>
        Bipan Chhetri
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-3 md:flex">
        <NavLinks />
        <AdminOnly>
          <Link href="/admin" className="btn-secondary py-1.5">
            Admin
          </Link>
        </AdminOnly>
        <div className="w-56">
          <SearchBar />
        </div>
      </nav>

      <NavBarClient />
    </Container>
  </header>
);

export default Navbar;
