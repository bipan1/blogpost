import ContentDisplay from '@/app/components/ContentDisplay';
import { Params } from '../../../types/Post';
import { extractFirstImage } from '@/lib/Helpers';
import 'react-quill/dist/quill.bubble.css';
import { fetchPost } from '@/data/Post';
import { Suspense } from 'react';
import Spinner from '@/app/components/Spinner';

export async function generateMetadata({ params }: { params: Params }) {
  const post = await fetchPost(parseInt(params.id));

  if ('error' in post) {
    return {
      title: 'Error',
      description: 'Post not found or there was an error fetching the post.',
      openGraph: {
        title: 'Error',
        description: 'Post not found or there was an error fetching the post.',
        images: [
          {
            url: 'https://example.com/default-image.jpg',
            alt: 'Error',
          },
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Error',
        description: 'Post not found or there was an error fetching the post.',
        images: ['https://example.com/default-image.jpg'],
      },
    };
  }

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

  if ('error' in post) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 p-2">Error</h1>
          <p className="text-gray-500 text-sm sm:text-md mb-3 p-2">
            {post.error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <div className="container mx-auto p-4 flex justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 p-2">
            {post.title}
          </h1>
          <p className="text-gray-500 text-sm sm:text-md mb-3 p-2">
            {post.formattedDate} -{' '}
            {Math.ceil(post.content.split(' ').length / 200)} min read
          </p>
          <ContentDisplay html={post.content} removeImage={false} />
        </div>
      </div>
    </Suspense>
  );
};

export default PostPage;
