import { HiOutlineLocationMarker } from 'react-icons/hi';
import Avatar from '../Avatar';
import { SOCIAL_LINKS } from '../Footer';

const Hero = () => (
  <header className="flex flex-col items-start gap-8 pt-12 sm:flex-row sm:items-center sm:pt-16">
    <Avatar size={128} className="ring-4 ring-white shadow-lg" />
    <div>
      <p className="text-sm font-semibold tracking-wider text-violet-700 uppercase">
        Software Engineer
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
        Bipan Chhetri
      </h1>
      <p className="mt-3 flex items-center gap-1.5 text-zinc-500">
        <HiOutlineLocationMarker aria-hidden="true" />
        Laverton, Victoria, Australia
      </p>
      <ul className="mt-5 flex gap-2">
        {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </header>
);

export default Hero;
