
import ReactQuill from 'react-quill';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

export const handleImageUpload = (quillRef: React.MutableRefObject<ReactQuill | null>) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    if(input.files && input.files[0]){
      const file = input.files[0];
      const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: `${Date.now()}-${file.name}`,
        Body: file
      };

      try {
        const { Location } = await s3.upload(params).promise();
        console.log(quillRef);
        if (quillRef.current) { 
          const quill = quillRef.current.getEditor();          
          const range = quill.getSelection(true);
          console.log(range)
          quill.insertEmbed(range.index, 'image', Location); 
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  }
};