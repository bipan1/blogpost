import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Single-admin auth: one password (ADMIN_PASSWORD) and a stateless session
 * cookie signed with AUTH_SECRET.
 *
 * Every protected page, Server Action and route handler must call
 * requireAdmin() / isAdmin() itself; layouts don't re-run on navigation.
 */

const SESSION_COOKIE = 'admin_session';
/** Readable by the browser, only used to decide whether to show admin links. */
export const ADMIN_HINT_COOKIE = 'is_admin';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const getConfig = () => {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!password || !secret || secret.length < 32) {
    throw new Error(
      'ADMIN_PASSWORD and AUTH_SECRET (32+ characters) must be set to use the admin area.',
    );
  }
  return { password, secret };
};

const sha256 = (value: string) => createHash('sha256').update(value).digest();

const safeEqual = (a: Buffer, b: Buffer) =>
  a.length === b.length && timingSafeEqual(a, b);

// The password hash is part of the signed payload, so changing ADMIN_PASSWORD
// signs every existing session out.
const sign = (expiresAt: number) => {
  const { password, secret } = getConfig();
  return createHmac('sha256', secret)
    .update(`${expiresAt}.${sha256(password).toString('hex')}`)
    .digest('base64url');
};

const isValidToken = (token: string | undefined) => {
  if (!token) return false;
  const [expiresAt, signature] = token.split('.');
  const expiry = Number(expiresAt);
  if (!Number.isInteger(expiry) || expiry < Date.now() / 1000 || !signature) {
    return false;
  }
  return safeEqual(Buffer.from(signature), Buffer.from(sign(expiry)));
};

export const checkPassword = (candidate: string) =>
  // Hash both sides so the comparison is constant-time regardless of length.
  safeEqual(sha256(candidate), sha256(getConfig().password));

export const createSession = async () => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const cookieStore = await cookies();
  const options = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
  cookieStore.set(SESSION_COOKIE, `${expiresAt}.${sign(expiresAt)}`, {
    ...options,
    httpOnly: true,
  });
  cookieStore.set(ADMIN_HINT_COOKIE, '1', options);
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete(ADMIN_HINT_COOKIE);
};

export const isAdmin = async () => {
  try {
    return isValidToken((await cookies()).get(SESSION_COOKIE)?.value);
  } catch {
    // Auth not configured: nobody is an admin.
    return false;
  }
};

/** Redirects to the login page unless the request has a valid session. */
export const requireAdmin = async (returnTo = '/admin') => {
  if (!(await isAdmin())) {
    redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  }
};
