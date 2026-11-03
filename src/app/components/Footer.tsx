import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import Container from './Container';

export const SOCIAL_LINKS = [
  { href: 'https://github.com/bipan1', label: 'GitHub', icon: FaGithub },
  {
    href: 'https://www.linkedin.com/in/bipan-chhetri-08bbb3201/',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
  {
    href: 'https://www.facebook.com/bipan.chhetri.90',
    label: 'Facebook',
    icon: FaFacebook,
  },
];

const Footer = () => (
  <footer className="mt-24 border-t border-zinc-200">
    <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
      <p className="text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} Bipan Chhetri. All rights reserved.
      </p>
      <ul className="flex items-center gap-1">
        {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="block rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <Icon size={18} />
            </a>
          </li>
        ))}
      </ul>
    </Container>
  </footer>
);

export default Footer;
