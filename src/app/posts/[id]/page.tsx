import ContentDisplay from '@/app/components/ContentDisplay';
import prisma from '../../../lib/prisma';
import { Post, Params } from '../../../types/Post';
import { formatDate } from '@/lib/Helpers';

const fetchPost = async (id: number): Promise<Post> => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

const PostPage = async ({ params }: { params: Params }) => {
  const post = await fetchPost(parseInt(params.id));

  return (
    <div>
      <div className="container mx-auto p-4 flex justify-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-500 text-md mb-3">
            {formatDate(post.createdAt)} -{' '}
            {Math.ceil(post.content.split(' ').length / 200)} min read
          </p>
          <ContentDisplay html={post.content} removeImage={false} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
