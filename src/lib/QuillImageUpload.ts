import type { RefObject } from 'react';
import type ReactQuill from 'react-quill-new';

const uploadImage = async (file: File): Promise<string> => {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, fileType: file.type }),
  });
  if (!res.ok) throw new Error(`Signing upload failed (${res.status})`);
  const { signedUrl } = (await res.json()) as { signedUrl: string };

  const put = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!put.ok) throw new Error(`S3 upload failed (${put.status})`);

  return signedUrl.split('?')[0];
};

/** Opens a file picker, uploads the chosen image to S3 and embeds it. */
export const handleImageUpload = (quillRef: RefObject<ReactQuill | null>) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  input.click();
};
