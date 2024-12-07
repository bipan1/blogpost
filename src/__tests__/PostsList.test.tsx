// src/__tests__/PostsList.test.tsx
import { render, screen } from '@testing-library/react';
import PostsList from '../app/components/PostsList';
import { PostDisplay } from '../types/Post';

const mockPosts: PostDisplay[] = [
  {
    id: 1,
    title: 'Test Post',
    content: 'This is a test post content.',
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    updatedAt: new Date('2023-01-01T00:00:00.000Z'),
    keywords: ['test'],
    formattedDate: 'January 1, 2023',
    published: true,
  },
];

describe('PostsList', () => {
  it('renders a list of posts', () => {
    render(<PostsList posts={mockPosts} />);
    const postTitle = screen.getByText(/Test Post/i);
    expect(postTitle).toBeInTheDocument();
  });
});
