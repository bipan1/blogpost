'use client';

import { useState, useTransition } from 'react';
import { deletePost } from '@/data/actions';

/** Two-step delete: the first click asks for confirmation inline. */
const DeletePostButton = ({ id, title }: { id: number; title: string }) => {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-sm font-medium text-zinc-500 hover:text-red-600"
        aria-label={`Delete "${title}"`}
      >
        Delete
      </button>
    );
  }

  return (
    <span className="flex items-center gap-3 text-sm">
      <span className="text-zinc-600">{error ?? 'Delete permanently?'}</span>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const result = await deletePost(id);
            if (result) setError(result.error);
          })
        }
        className="font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
      >
        {isPending ? 'Deleting...' : 'Yes, delete'}
      </button>
      <button
        type="button"
        onClick={() => {
          setConfirming(false);
          setError(undefined);
        }}
        className="font-medium text-zinc-500 hover:text-zinc-900"
      >
        Cancel
      </button>
    </span>
  );
};

export default DeletePostButton;
