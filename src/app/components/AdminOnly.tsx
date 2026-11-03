'use client';

import { useSyncExternalStore } from 'react';

// Mirrors ADMIN_HINT_COOKIE in lib/auth.ts (that module is server-only).
const HINT = 'is_admin=1';

const subscribe = () => () => {};
const getSnapshot = () => document.cookie.split('; ').includes(HINT);
const getServerSnapshot = () => false;

/**
 * Renders children only for a signed-in admin. Reads a non-secret hint cookie
 * so public pages stay static; it only controls visibility of links. Every
 * admin page and action still verifies the real session on the server.
 */
const AdminOnly = ({ children }: { children: React.ReactNode }) =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    ? children
    : null;

export default AdminOnly;
