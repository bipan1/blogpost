import axios from 'axios';
import ReactQuill from 'react-quill';

const uploadFileToS3 = async (file: File, signedUrl: string) => {
  try {
    const putResponse = await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    if (putResponse.status !== 200) {
      throw new Error(`S3 upload failed with status ${putResponse.status}`);
    }

    const imageUrl = signedUrl.split('?')[0];
    return imageUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

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

        try {
          const response = await axios.post('/api/upload', {
            fileName: file.name,
            fileType: file.type,
          });

          const { signedUrl } = response.data;

          const imageUrl = await uploadFileToS3(file, signedUrl);

          if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', imageUrl);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };
  }
};
