import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
  },
  datasource: {
    // Read lazily so `prisma generate` works without a database (e.g. in CI).
    url: process.env.DATABASE_URL ?? '',
  },
});
