# Bipan·Blog

A personal blog and portfolio built with the **Next.js App Router**, React Server Components and streaming SSR. It is deployed on **Vercel**.

## Stack

- **Next.js 16 / React 19**: Server Components, Suspense streaming and Server Actions
- **PostgreSQL (Neon)** accessed through **Prisma 7** and the `pg` driver adapter
- **Elasticsearch** for post search and title autocomplete
- **AWS S3** for images uploaded from the editor (presigned URLs)
- **Tailwind CSS 4**, **Quill** editor (`react-quill-new`), **EmailJS** contact form
- **Vitest** + Testing Library, **ESLint 9** (flat config), **Prettier**

## How pages render

| Route          | Strategy                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| `/`            | Server-rendered per request. Recent posts stream in behind Suspense.     |
| `/posts`       | Server-rendered per request (category, page and search query params).    |
| `/posts/[id]`  | ISR: rendered on first request, cached, and revalidated at most hourly.  |
| `/about`, `/contact` | Static.                                                           |
| `/admin/*`, `/login` | Server-rendered per request, password protected.                  |

Data access lives in `src/data/posts.ts` (server-only) and is called directly from Server Components. Mutations go through the `createPost` Server Action in `src/data/actions.ts`.

## Getting started

Requires Node.js 20.19+.

```bash
npm install          # also runs `prisma generate`
npm run dev:local    # http://localhost:3000
```

`dev:local` reads `.env` (or `.env.example` if there is no `.env`). Both are git-ignored; production values live in the Vercel project settings. Then:

- **`DATABASE_URL` empty:** starts an embedded Postgres (data in `./.pglite`), applies migrations and seeds sample posts. No database account needed.
- **`DATABASE_URL` set:** connects to that database and only *checks* migrations. It never applies them, so a production database is never changed. Pass `--local-db` to use the embedded database anyway.

Elasticsearch, S3 and EmailJS are optional. Without Elasticsearch, search falls back to a database title match.

To run against your own database without the helper, use `npm run db:migrate` and then `npm run dev`.

## Writing posts

Sign in at `/login` with `ADMIN_PASSWORD`. An **Admin** link then appears in the navbar.

- `/admin` lists every post, drafts included, with links to edit and delete.
- `/admin/new` opens the editor. **Save draft** keeps the post private and **Publish** makes it live.
- Saving a post updates Elasticsearch automatically. `npm run sync-data` is only needed to rebuild the index.

Production needs `ADMIN_PASSWORD` and `AUTH_SECRET` (32+ random characters, e.g. `openssl rand -hex 32`) in the Vercel project settings. Changing either one signs out every session.

## Scripts

| Script              | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm run dev:local` | Run locally (embedded DB if none configured)    |
| `npm run dev`       | Start the dev server                            |
| `npm run build`     | Production build                                |
| `npm run lint`      | ESLint                                          |
| `npm run typecheck` | TypeScript                                      |
| `npm test`          | Unit tests (Vitest)                             |
| `npm run db:migrate`| Apply Prisma migrations                         |
| `npm run db:seed`   | Add sample posts to an empty database           |
| `npm run sync-data` | Re-index all post titles into Elasticsearch     |

## Project structure

```
src/
  app/          routes, layouts, API route handlers and components
  data/         server-only queries and Server Actions
  lib/          Prisma/Elasticsearch clients and shared helpers
  prisma/       schema and migrations
  generated/    Prisma client (generated, not committed)
scripts/        maintenance scripts (Elasticsearch sync)
```
