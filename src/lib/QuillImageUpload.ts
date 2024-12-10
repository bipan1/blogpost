import ReactQuill from 'react-quill';

export const handleImageUpload = (
  quillRef: React.MutableRefObject<ReactQuill | null>,
) => {
  if (typeof document !== 'undefined') {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
          }),
        });

        const { signedUrl } = await response.json();

        try {
          await fetch(signedUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });

          const imageUrl = signedUrl.split('?')[0];

          if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', imageUrl);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }

        // const params = {
        //   Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        //   Key: `${Date.now()}-${file.name}`,
        //   Body: file,
        //   ContentType: file.type,
        // };

        // try {
        //   const { Location } = await s3.upload(params).promise();
        //   if (quillRef.current) {
        //     const quill = quillRef.current.getEditor();
        //     const range = quill.getSelection(true);
        //     quill.insertEmbed(range.index, 'image', Location);
        //   }
        // } catch (error) {
        //   console.error('Error uploading file:', error);
        // }
      }
    };
  }
};
