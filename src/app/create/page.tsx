import { PrismaClient } from '@prisma/client';
import CreateForm from '../components/Createform';
import { PostSubmitData } from '@/types/Post';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

const CreatePage = () => {
  const submitForm = async (data: PostSubmitData) => {
    'use server';
    const keywordsArray = data.keywords
      .split(',')
      .map((keyword) => keyword.trim());
    await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        keywords: keywordsArray,
      },
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
