import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { PostDisplay } from '@/types/Post';
import PostsList from './PostsList';

const makePost = (overrides: Partial<PostDisplay> = {}): PostDisplay => ({
  id: 1,
  title: 'Test Post',
  content: '<p>This is a <strong>test</strong> post &amp; content.</p>',
  published: true,
  createdAt: new Date('2023-01-01T00:00:00.000Z'),
  updatedAt: new Date('2023-01-01T00:00:00.000Z'),
  keywords: ['test', 'react'],
  category: 'WebDev',
  formattedDate: '01 Jan 2023',
  readingTime: 1,
  ...overrides,
});

describe('PostsList', () => {
  it('renders each post with a link, date, excerpt and keywords', () => {
    render(<PostsList posts={[makePost()]} />);

    expect(screen.getByRole('link', { name: /Test Post/ })).toHaveAttribute(
      'href',
      '/posts/1',
    );
    expect(screen.getByText('01 Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('1 min read')).toBeInTheDocument();
    expect(screen.getByText('WebDev')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test post & content.'),
    ).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('renders the excerpt as text, never as HTML', () => {
    const { container } = render(
      <PostsList
        posts={[
          makePost({ content: '<p>&lt;img src=x onerror=alert(1)&gt;</p>' }),
        ]}
      />,
    );

    expect(container.querySelector('img')).toBeNull();
    expect(
      screen.getByText('<img src=x onerror=alert(1)>'),
    ).toBeInTheDocument();
  });

  it('shows an empty state when there are no posts', () => {
    render(<PostsList posts={[]} emptyMessage="Nothing here." />);
    expect(screen.getByText('Nothing here.')).toBeInTheDocument();
  });
});
