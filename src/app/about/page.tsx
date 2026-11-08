import type { Metadata } from 'next';
import About from '../components/About/About';
import Experience from '../components/About/Experience';
import Hero from '../components/About/Hero';
import Project from '../components/About/Project';
import Container from '../components/Container';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Experience, education and projects of Bipan Chhetri.',
};

export default function AboutPage() {
  return (
    <Container className="space-y-20">
      <Hero />
      <About />
      <Experience />
      <Project />
    </Container>
  );
}
