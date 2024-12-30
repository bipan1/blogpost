import { NextRequest, NextResponse } from 'next/server';
import { Client as ESClient, estypes } from '@elastic/elasticsearch';

const esClient = new ESClient({
  node: process.env.ELASTICSEARCH_URL,
  ssl: {
    cert: process.env.ELASTICSEARCH_CLIENT_CERT,
    key: process.env.ELASTICSEARCH_CLIENT_KEY,
    ca: process.env.ELASTICSEARCH_CA_CERT,
    rejectUnauthorized: false,
  },
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 },
    );
  }

  try {
    const result = await esClient.search({
      index: 'blogposts',
      body: {
        query: {
          match: {
            title: query,
          },
        },
      },
    });

    const results = result.body.hits.hits.map(
      (hit: estypes.SearchHit) => hit._id,
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error during Elasticsearch search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
