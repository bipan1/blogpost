import ContentDisplay from '@/app/components/ContentDisplay';
import prisma from '../../../lib/prisma';
import { Post, Params } from '../../../types/Post';

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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      </div>
      <ContentDisplay html={post.content} removeImage={false} />
    </div>
  );
};

export default PostPage;
