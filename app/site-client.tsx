'use client';
import { useEffect, useState } from 'react';
import Site from './recovered-site';
import Login from './admin-login';
import { ye } from './data-client';
import { setContent } from './content-store';
import { registerKennelTools } from './webmcp';
export default function SiteClient() {
  const [saving, setSaving] = useState(0);
  const [ready, setReady] = useState(false);
  const [owner, setOwner] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const unregister = registerKennelTools();
    const run = async () => {
      const result: any = await ye.from('Settings').select();
      if (result.data?.[0]) setContent(result.data[0].content);
      if (location.pathname === '/admin') {
        try {
          setOwner(
            ((await (await fetch('/api/auth')).json()) as any).authenticated,
          );
        } catch {
          setError('Unable to check login. Please try again.');
        }
      }
      setReady(true);
    };
    run();
    const handler = (e: Event) => setError((e as CustomEvent).detail);
    window.addEventListener('kennel-error', handler);
    const saveHandler = (e: Event) => setSaving((e as CustomEvent).detail);
    window.addEventListener('kennel-saving', saveHandler);
    return () => {
      unregister?.();
      window.removeEventListener('kennel-error', handler);
      window.removeEventListener('kennel-saving', saveHandler);
    };
  }, []);
  if (!ready)
    return (
      <main className="home">
        <section className="hero-section">
          <div className="hero-content">
            <p className="eyebrow">Elite XL American Bullies</p>
            <h1>
              Welcome to <span>Seibab Kennel</span>
            </h1>
            <p>
              Discover our elite breeding program where health, temperament, and
              championship bloodlines come together.
            </p>
            <a className="primary-button" href="/available-puppies">
              Browse Available Puppies
            </a>
          </div>
          <img
            width="500"
            src="/assets/dog1-BnooSC2S.png"
            alt="Seibab XL American Bully"
          />
        </section>
      </main>
    );
  return (
    <>
      {saving > 0 && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 9000,
            background: '#171717',
            color: '#e9bd60',
            padding: 12,
          }}
        >
          Saving changes…
        </div>
      )}
      {error && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 10000,
            background: '#5c1b18',
            color: 'white',
            padding: 16,
            borderRadius: 12,
          }}
        >
          {error}
          <button style={{ float: 'right' }} onClick={() => setError('')}>
            Dismiss
          </button>
        </div>
      )}
      {location.pathname === '/admin' && !owner ? (
        <Login onLogin={() => setOwner(true)} />
      ) : (
        <Site />
      )}
    </>
  );
}
