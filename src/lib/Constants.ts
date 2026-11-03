import { Category } from '@/generated/prisma/enums';

export { Category };

export const POST_LIMIT = 4;

export const DEFAULT_CATEGORY: Category = Category.WebDev;

export const CATEGORIES = Object.values(Category);

export const NAV_LINKS = [
  { href: '/posts', label: 'Posts' },
  { href: '/about', label: 'About Me' },
  { href: '/contact', label: 'Contact Us' },
] as const;
