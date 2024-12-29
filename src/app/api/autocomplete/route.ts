
import { NextRequest, NextResponse } from 'next/server';
import { Client as ESClient } from '@elastic/elasticsearch';
import fs from 'fs';

const esClient = new ESClient({
  node: process.env.ELASTICSEARCH_URL,
  ssl: {
    cert: fs.readFileSync(process.env.ELASTICSEARCH_CLIENT_CERT!),
    key: fs.readFileSync(process.env.ELASTICSEARCH_CLIENT_KEY!),
    ca: fs.readFileSync(process.env.ELASTICSEARCH_CA_CERT!),
    rejectUnauthorized: false,
  },
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const query = url.searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await esClient.search({
      index: 'blogposts',
      body : {
        query: { 
          multi_match: { 
            query: query, 
            fields: ["title_as_you_type"], 
            type: "bool_prefix" 
          } 
        },
        highlight: {
          fields: { 
            title_as_you_type: {
              fragment_size: 30,
            }
          } 
        }
      }
    });

    const suggestions = response.body.hits.hits.flatMap((hit: any) => {
      return {text : hit.highlight?.title_as_you_type || [], id : hit._id}; 
    }).slice(0, 5);

    return NextResponse.json(suggestions);
    
  } catch (error) {
    console.error('Error during Elasticsearch search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
