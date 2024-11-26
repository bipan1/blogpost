import Link from 'next/link';
import { Post } from '../../types/Post';
import ContentDisplay from './ContentDisplay';
import { formatDate } from '@/lib/Helpers';

interface PostsListProps {
  posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div key={post.id} className="mb-4 w-2/3">
              <h2 className="text-xl font-bold text-purple-900">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                {formatDate(post.createdAt)} -{' '}
                {Math.ceil(post.content.split(' ').length / 200)} min read
              </p>
              <ContentDisplay html={post.content} removeImage={true} />
            </div>
            <div className="flex mb-5">
              {post.keywords.map((keyword: string) => (
                <div
                  key={keyword}
                  className="text-xs bg-gray-300 border-2 mr-3 border-gray-400 px-4 py-1 rounded-md"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
