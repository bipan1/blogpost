import { NextRequest, NextResponse } from 'next/server';
import { searchPostIds } from '@/lib/elasticsearch';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 },
    );
  }

  try {
    const ids = await searchPostIds(query);
    return NextResponse.json(ids.map(String));
  } catch (error) {
    console.error('Error during Elasticsearch search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
