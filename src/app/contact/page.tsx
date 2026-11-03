import type { Metadata } from 'next';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import ContactForm from '../components/ContactForm';
import Container from '../components/Container';
import { SOCIAL_LINKS } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Bipan Chhetri.',
};

export default function ContactPage() {
  return (
    <Container>
      <div className="grid gap-12 pt-12 sm:pt-16 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">
            Have a question, an opportunity or just want to say hello? Send me a
            message and I&apos;ll get back to you.
          </p>
          <ul className="mt-8 space-y-3 text-zinc-700">
            <li className="flex items-center gap-3">
              <HiOutlineMail
                className="text-zinc-400"
                size={20}
                aria-hidden="true"
              />
              <a
                href="mailto:bipan13345@gmail.com"
                className="hover:text-violet-700"
              >
                bipan13345@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <HiOutlineLocationMarker
                className="text-zinc-400"
                size={20}
                aria-hidden="true"
              />
              Laverton, Victoria, Australia
            </li>
          </ul>
          <ul className="mt-6 flex gap-2">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-secondary px-2.5"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
