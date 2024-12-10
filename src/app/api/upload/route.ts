import { NextResponse, NextRequest } from 'next/server';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

export async function POST(req: NextRequest) {
  const { fileName, fileType } = await req.json();

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: `${Date.now()}-${fileName}`,
    ContentType: fileType,
    ACL: 'public-read',
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
