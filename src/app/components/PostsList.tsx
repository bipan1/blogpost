import Link from 'next/link';
import { Post } from '../../types/Post';

interface PostsListProps {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
