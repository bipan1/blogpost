import { PostSubmitData } from '@/types/Post';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { createPost } from '@/data/Action';

const CreateForm = dynamic(() => import('../components/Createform'), {
  ssr: false,
});

const CreatePage = () => {
  const submitForm = async (data: PostSubmitData) => {
    'use server';
    const keywordsArray = data.keywords
      .split(' ')
      .map((keyword) => keyword.trim());
    await createPost({
      ...data,
      keywords: keywordsArray,
    });
    redirect('/posts');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <CreateForm submitForm={submitForm} />
    </div>
  );
};

export default CreatePage;
