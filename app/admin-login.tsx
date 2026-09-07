'use client';
import { useState } from 'react';
export default function Login({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <main className="admin-login-page">
      <form
        className="admin-login-card"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError('');
          const values = new FormData(e.currentTarget);
          try {
            const r = await fetch('/api/auth', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Object.fromEntries(values)),
            });
            const result: any = await r.json();
            if (!r.ok) setError(result.error);
            else onLogin();
          } catch {
            setError('Unable to connect. Please try again.');
          } finally {
            setBusy(false);
          }
        }}
      >
        <img src="/assets/logo1-BDcs8sUA.jpg" alt="Seibab Kennel" width="96" />
        <p className="eyebrow">Owner Login</p>
        <h1>Seibab Kennel Admin</h1>
        <p>Manage puppies, studs, inquiries, reviews, and kennel updates.</p>
        <label>
          Username
          <input name="username" autoComplete="username" required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p role="alert">{error}</p>}
        <button disabled={busy}>{busy ? 'Signing in…' : 'Log In'}</button>
        <a href="/">Back to website</a>
      </form>
    </main>
  );
}
