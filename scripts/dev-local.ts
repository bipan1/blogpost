/**
 * Runs the app locally.
 *
 *   npm run dev:local                  # use DATABASE_URL from the env file
 *   npm run dev:local -- --local-db    # force the embedded local database
 *   npm run dev:local -- --port 4000   # other args are passed to `next dev`
 *
 * Environment comes from .env, or .env.example when there is no .env.
 *
 * Database:
 * - DATABASE_URL empty (or --local-db): starts an embedded Postgres (PGlite)
 *   with data kept in ./.pglite, applies migrations and seeds sample posts.
 * - DATABASE_URL set: connects to it as-is. Migrations are only *checked*,
 *   never applied, so a remote/production database is never modified.
 *
 * Elasticsearch, S3 and EmailJS are optional: without them search falls back
 * to a database title match, and image upload / the contact form fail.
 */
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'dotenv';

const LOCAL_DB_PORT = 54329;
const LOCAL_DB_DIR = './.pglite';

const log = (message: string) =>
  console.log(`\x1b[35m[dev:local]\x1b[0m ${message}`);

const args = process.argv.slice(2);
const forceLocalDb = args.includes('--local-db');
const nextArgs = args.filter((arg) => arg !== '--local-db');

const loadEnvFile = () => {
  const file = existsSync('.env') ? '.env' : '.env.example';
  if (!existsSync(file)) {
    log('No .env or .env.example found; using the local database only.');
    return {};
  }
  log(`Loading environment from ${file}`);
  return parse(readFileSync(file));
};

// Async on purpose: the embedded database runs in this process, so blocking
// the event loop (spawnSync) would stop it from answering.
const run = (command: string, args: string[], env: NodeJS.ProcessEnv) =>
  new Promise<boolean>((resolve) => {
    spawn(command, args, { stdio: 'inherit', env })
      .on('exit', (code) => resolve(code === 0))
      .on('error', () => resolve(false));
  });

const startLocalDatabase = async () => {
  const { PGlite } = await import('@electric-sql/pglite');
  const { PGLiteSocketServer } = await import('@electric-sql/pglite-socket');

  const db = new PGlite(LOCAL_DB_DIR);
  await db.waitReady;
  const server = new PGLiteSocketServer({
    db,
    host: '127.0.0.1',
    port: LOCAL_DB_PORT,
    maxConnections: 20,
  });
  await server.start();
  log(
    `Embedded Postgres on 127.0.0.1:${LOCAL_DB_PORT} (data in ${LOCAL_DB_DIR})`,
  );

  return {
    url: `postgresql://postgres:postgres@127.0.0.1:${LOCAL_DB_PORT}/postgres?sslmode=disable`,
    stop: async () => {
      await server.stop();
      await db.close();
    },
  };
};

const warnAboutOptionalServices = (env: NodeJS.ProcessEnv) => {
  const missing = (...keys: string[]) => keys.some((key) => !env[key]);
  if (missing('ELASTICSEARCH_URL')) {
    log('Elasticsearch not configured: search uses a database title match.');
  }
  if (
    missing(
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'AWS_BUCKET_NAME',
    )
  ) {
    log('S3 not configured: image upload in the editor will fail.');
  }
  if (
    missing(
      'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
      'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
      'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
    )
  ) {
    log('EmailJS not fully configured: the contact form will fail on send.');
  }
};

const main = async () => {
  // Shell variables win over the file, matching how Next.js loads env files.
  const env: NodeJS.ProcessEnv = { ...loadEnvFile(), ...process.env };
  let localDb: Awaited<ReturnType<typeof startLocalDatabase>> | undefined;

  const shutdown = async (code: number) => {
    await localDb?.stop().catch(() => {});
    process.exit(code);
  };

  if (forceLocalDb || !env.DATABASE_URL) {
    localDb = await startLocalDatabase();
    env.DATABASE_URL = localDb.url;

    log('Applying migrations to the local database...');
    if (!(await run('npx', ['prisma', 'migrate', 'deploy'], env))) {
      console.error('Migrations failed.');
      await shutdown(1);
    }
    const { seed } = await import('./seed');
    await seed(localDb.url);
  } else {
    const host = new URL(env.DATABASE_URL).host;
    log(`Using DATABASE_URL (${host}). Checking migrations, not applying.`);
    if (!(await run('npx', ['prisma', 'migrate', 'status'], env))) {
      log(
        'Database has pending migrations or is unreachable. Apply them ' +
          'deliberately with `npm run db:migrate`, or use --local-db.',
      );
    }
  }

  // Admin sign-in. Defaults are only filled in for the throwaway local
  // database; a real database never gets a guessable password.
  if (!env.AUTH_SECRET) env.AUTH_SECRET = randomBytes(32).toString('hex');
  if (!env.ADMIN_PASSWORD && localDb) {
    env.ADMIN_PASSWORD = 'admin';
    log('Admin sign-in at /login with password "admin" (local database only).');
  } else if (!env.ADMIN_PASSWORD) {
    log('ADMIN_PASSWORD not set: the admin area is disabled.');
  }

  warnAboutOptionalServices(env);

  const next = spawn('npx', ['next', 'dev', ...nextArgs], {
    stdio: 'inherit',
    env,
  });
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => next.kill(signal));
  }
  next.on('exit', (code) => shutdown(code ?? 0));
};

await main();
