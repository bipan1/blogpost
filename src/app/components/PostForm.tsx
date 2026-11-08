'use client';

import { useMemo, useRef, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createPost, updatePost } from '@/data/actions';
import { CATEGORIES, DEFAULT_CATEGORY } from '@/lib/Constants';
import { handleImageUpload } from '@/lib/QuillImageUpload';
import type { PostInput } from '@/types/Post';

export type PostFormProps = {
  /** Present when editing an existing post. */
  post?: { id: number } & PostInput;
};

const PostForm = ({ post }: PostFormProps) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<PostInput>({
    defaultValues: post ?? {
      title: '',
      keywords: '',
      content: '',
      category: DEFAULT_CATEGORY,
      published: false,
    },
  });
  const quillRef = useRef<ReactQuill>(null);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string>();

  // Memoised: ReactQuill re-initialises the editor if modules change.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'code-block'],
          ['clean'],
        ],
        handlers: {
          image: () => handleImageUpload(quillRef),
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const [pendingAction, setPendingAction] = useState<'draft' | 'publish'>();

  const save = (published: boolean) =>
    handleSubmit((data) => {
      setServerError(undefined);
      setPendingAction(published ? 'publish' : 'draft');
      startTransition(async () => {
        const input = { ...data, published };
        // On success the action redirects, so a result means it failed.
        const result = post
          ? await updatePost(post.id, input)
          : await createPost(input);
        if (result) setServerError(result.error);
      });
    });

  return (
    <form
      onSubmit={save(true)}
      className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8"
    >
      <div>
        <label htmlFor="title" className="field-label">
          Title
        </label>
        <input
          id="title"
          aria-invalid={!!errors.title}
          {...register('title', { required: true })}
          className="field-input text-lg font-medium"
        />
        {errors.title && <p className="field-error">Title is required.</p>}
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label htmlFor="keywords" className="field-label">
            Keywords{' '}
            <span className="font-normal text-zinc-400">(space separated)</span>
          </label>
          <input
            id="keywords"
            placeholder="react nextjs ssr"
            {...register('keywords')}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="category" className="field-label">
            Category
          </label>
          <select
            id="category"
            {...register('category')}
            className="field-input"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <span className="field-label">Content</span>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ReactQuill
              ref={quillRef}
              theme="snow"
              // Keep ordinary spaces: the default "semantic" HTML export turns
              // every space into &nbsp;.
              useSemanticHTML={false}
              modules={modules}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="editor"
            />
          )}
        />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-4 border-t border-zinc-100 pt-6">
        {serverError && (
          <p className="mr-auto text-sm text-red-600">{serverError}</p>
        )}
        <button
          type="button"
          onClick={save(false)}
          disabled={isPending}
          className="btn-secondary"
        >
          {isPending && pendingAction === 'draft'
            ? 'Saving...'
            : post?.published
              ? 'Unpublish'
              : 'Save draft'}
        </button>
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending && pendingAction === 'publish'
            ? 'Publishing...'
            : post?.published
              ? 'Update post'
              : 'Publish'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
