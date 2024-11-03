'use client';

import { PostSubmitData } from '@/types/Post';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateForm = ({ submitForm } : {submitForm : any}) => {
  const { handleSubmit, control } = useForm<PostSubmitData>();

  const onSubmit = (data : PostSubmitData) => {
    const serializedData = {
      ...data,
      content : JSON.stringify(data.content)
    };
    submitForm(serializedData);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <Controller
          name="title" 
          control={control} 
          defaultValue="" 
          render={({ field }) => <input {...field} className="mt-1 p-2 border border-gray-300 rounded w-full" />} 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => <ReactQuill {...field} theme="snow" />}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Keywords (comma-separated)</label>
        <Controller
          name="keywords"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} className="mt-1 p-2 border border-gray-300 rounded w-full" />}
        />
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default CreateForm;
