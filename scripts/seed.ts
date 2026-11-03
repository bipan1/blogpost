/**
 * Inserts a few sample posts when the Post table is empty.
 * Usage: npm run db:seed   (uses DATABASE_URL)
 */
import pg from 'pg';
import 'dotenv/config';

const paragraph =
  'Server components let you fetch data right where it is rendered, which removes a whole layer of client-side plumbing. This sample post exists so the site has something to show when running locally.';

const samples: {
  title: string;
  category: string;
  keywords: string[];
  html: string;
  published?: boolean;
}[] = [
  {
    title: 'Welcome to the local development blog',
    category: 'WebDev',
    keywords: ['nextjs', 'local'],
    html: `<p>${paragraph}</p><h2>Formatting check</h2><p>Some <strong>bold</strong> text, <code>inline code</code> and <a href="https://nextjs.org">a link</a>.</p><ul><li>First bullet</li><li>Second bullet</li></ul><blockquote>Make it work, make it right, make it fast.</blockquote><pre class="ql-syntax" spellcheck="false">const posts = await getPosts();\n</pre><p><img src="/images/blogpost.png"></p>`,
  },
  {
    title: 'Streaming SSR with Suspense',
    category: 'WebDev',
    keywords: ['react', 'ssr'],
    html: `<p>${paragraph}</p>`,
  },
  {
    title: 'Searching posts without Elasticsearch',
    category: 'WebDev',
    keywords: ['search'],
    html: `<p>${paragraph}</p>`,
  },
  {
    title: 'Uploading images with presigned URLs',
    category: 'WebDev',
    keywords: ['aws', 's3'],
    html: `<p>${paragraph}</p>`,
  },
  {
    title: 'Paginating with Prisma',
    category: 'WebDev',
    keywords: ['prisma'],
    html: `<p>${paragraph}</p>`,
  },
  {
    title: 'An unpublished draft',
    category: 'Tech',
    keywords: ['draft'],
    html: `<p>Only visible in the admin area until it is published.</p>`,
    published: false,
  },
  {
    title: 'A sample Tech post',
    category: 'Tech',
    keywords: ['tech'],
    html: `<p>${paragraph}</p>`,
  },
];

export const seed = async (connectionString: string) => {
  const client = new pg.Client({ connectionString });
  await client.connect();
  try {
    const { rows } = await client.query(
      'SELECT COUNT(*)::int AS n FROM "Post"',
    );
    if (rows[0].n > 0) {
      console.log(`Skipping seed: ${rows[0].n} posts already exist.`);
      return;
    }
    for (const [i, post] of samples.entries()) {
      await client.query(
        `INSERT INTO "Post" (title, content, keywords, category, published, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, now() - ($6 || ' days')::interval, now())`,
        // Content is stored JSON-encoded, matching createPost.
        [
          post.title,
          JSON.stringify(post.html),
          post.keywords,
          post.category,
          post.published ?? true,
          String(i),
        ],
      );
    }
    console.log(`Seeded ${samples.length} sample posts.`);
  } finally {
    await client.end();
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set.');
    process.exit(1);
  }
  await seed(process.env.DATABASE_URL);
}
