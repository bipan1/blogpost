import Link from 'next/link';
import { PostDisplay } from '../../types/Post';
import ContentDisplay from './ContentDisplay';

interface PostsListProps {
  posts: PostDisplay[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>No Posts Available.</p>;
  }

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} prefetch={true}>
            <div key={post.id} className="mb-4 w-2/3">
              <h2 className="text-xl font-bold text-purple-900">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                {post.formattedDate} -{' '}
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
