'use client';

import { useActionState } from 'react';
import { login } from '@/data/actions';

const LoginForm = ({ next }: { next: string }) => {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8"
    >
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="password" className="field-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={!!state?.error}
          aria-describedby={state?.error ? 'login-error' : undefined}
          className="field-input"
        />
        {state?.error && (
          <p id="login-error" className="field-error">
            {state.error}
          </p>
        )}
      </div>
      <button type="submit" disabled={isPending} className="btn-primary w-full">
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginForm;
