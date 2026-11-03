import { randomUUID } from 'node:crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';

let s3: S3Client | undefined;

const getS3 = () => {
  s3 ??= new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  return s3;
};

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const fileName: unknown = body?.fileName;
  const fileType: unknown = body?.fileType;

  if (
    typeof fileName !== 'string' ||
    typeof fileType !== 'string' ||
    !fileType.startsWith('image/')
  ) {
    return NextResponse.json(
      { error: 'An image fileName and fileType are required' },
      { status: 400 },
    );
  }

  // Prefix with a UUID so uploads never overwrite each other.
  const safeName = fileName.replace(/[^\w.-]+/g, '-').slice(-100);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${randomUUID()}-${safeName}`,
    ContentType: fileType,
  });

  try {
    const signedUrl = await getSignedUrl(getS3(), command, { expiresIn: 60 });
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error('Failed to generate signed URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate signed URL' },
      { status: 500 },
    );
  }
}
