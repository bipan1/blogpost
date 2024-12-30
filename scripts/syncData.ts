import { Client as ESClient } from '@elastic/elasticsearch';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'ELASTICSEARCH_URL',
  'ELASTICSEARCH_CLIENT_CERT',
  'ELASTICSEARCH_CLIENT_KEY',
  'ELASTICSEARCH_CA_CERT',
  'DATABASE_URL',
];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`Missing environment variable: ${varName}`);
    process.exit(1);
  }
}

const esClient = new ESClient({
  node: process.env.ELASTICSEARCH_URL,
  ssl: {
    // tls : Replaced with version 8 and above.
    cert: process.env.ELASTICSEARCH_CLIENT_CERT,
    key: process.env.ELASTICSEARCH_CLIENT_KEY,
    ca: process.env.ELASTICSEARCH_CA_CERT,
    rejectUnauthorized: false,
  },
});

const pgClient = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

interface BlogPost {
  id: number;
  title: string;
  keywords: string[];
}

const syncData = async () => {
  try {
    await pgClient.connect();

    // Pagination logic
    const batchSize = 100;
    let offset = 0;
    let hasMoreData = true;

    while (hasMoreData) {
      const res = await pgClient.query(
        'SELECT * FROM "Post" LIMIT $1 OFFSET $2',
        [batchSize, offset],
      );
      const posts: BlogPost[] = res.rows;

      if (posts.length < batchSize) hasMoreData = false;

      for (const post of posts) {
        await esClient.index({
          index: 'blogposts',
          id: post.id.toString(),
          body: {
            title: post.title,
            title_as_you_type: post.title,
            title_suggest: {
              input: [post.title],
            },
          },
        });
      }

      offset += batchSize;
    }

    console.log('Data synchronized successfully');
  } catch (error) {
    console.error('Error during data synchronization:', error.message);
  } finally {
    await pgClient.end(); // Ensure the client connection is closed
  }
};

syncData();
