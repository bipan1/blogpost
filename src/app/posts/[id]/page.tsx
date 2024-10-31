import prisma from '../../../lib/prisma';
import { Post, Params } from '../../../types/Post';

const fetchPost = async (id : number) : Promise<Post> => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  if (!post) { 
    throw new Error('Post not found'); 
  }
  return post;
};

const PostPage = async ({ params } : { params: Params }) => {
  const post = await fetchPost(parseInt(params.id));

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
