import ContentDisplay from '@/app/components/ContentDisplay';
import prisma from '../../../lib/prisma';
import { Post, Params } from '../../../types/Post';
import { extractFirstImage, formatDate } from '@/lib/Helpers';
import 'react-quill/dist/quill.bubble.css';

const fetchPost = async (id: number): Promise<Post> => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

export async function generateMetadata({ params }: { params: Params }) {
  const post = await fetchPost(parseInt(params.id));
  const firstImage = extractFirstImage(post.content);

  return {
    title: post.title,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: [
        {
          url: firstImage || 'https://example.com/default-image.jpg',
          alt: post.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content.substring(0, 160),
      images: [firstImage || 'https://example.com/default-image.jpg'],
    },
  };
}

const PostPage = async ({ params }: { params: Params }) => {
  const post = await fetchPost(parseInt(params.id));

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 p-2">
          {post.title}
        </h1>
        <p className="text-gray-500 text-sm sm:text-md mb-3 p-2">
          {formatDate(post.createdAt)} -{' '}
          {Math.ceil(post.content.split(' ').length / 200)} min read
        </p>
        <ContentDisplay html={post.content} removeImage={false} />
      </div>
    </div>
  );
};

export default PostPage;
