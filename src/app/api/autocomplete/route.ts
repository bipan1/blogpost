import { NextRequest, NextResponse } from 'next/server';
import { autocompletePosts } from '@/data/posts';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(await autocompletePosts(query));
  } catch (error) {
    console.error('Error during autocomplete:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
