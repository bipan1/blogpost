'use client';

import dynamic from 'next/dynamic';
import type { PostFormProps } from './PostForm';
import Spinner from './Spinner';

// Quill touches `document` on import, so it can only render in the browser.
// `ssr: false` is only allowed inside Client Components.
const PostForm = dynamic<PostFormProps>(() => import('./PostForm'), {
  ssr: false,
  loading: () => <Spinner />,
});

export default PostForm;
