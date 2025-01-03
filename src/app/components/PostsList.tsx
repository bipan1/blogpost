import Link from 'next/link';
import ContentDisplay from './ContentDisplay';
import { fetchPosts } from '@/data/Post';
import { Category } from '@/lib/Constants';

interface PostsListProps {
  page: number;
  search?: string;
  category?: Category;
}

const PostsList: React.FC<PostsListProps> = async ({
  page,
  search,
  category,
}) => {
  const posts = await fetchPosts(page, search, category);

  if ('error' in posts) {
    return (
      <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <p className="text-red-500">{posts.error}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <p className="text-center font-bold text-xl">No Posts Available.</p>;
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
