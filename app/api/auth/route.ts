import {
  admin,
  config,
  db,
  digest,
  json,
  rate,
  sameOrigin,
  verifyPassword,
} from '@/lib/server';
export async function GET(req: Request) {
  return json({ authenticated: await admin(req) });
}
export async function POST(req: Request) {
  try {
    if (!sameOrigin(req)) return json({ error: 'Invalid request origin' }, 403);
    if (!(await rate(req, 'login', 10)))
      return json(
        { error: 'Too many attempts. Try again in 10 minutes.' },
        429,
      );
    const { username } = (await req.json()) as any;
    // Allow only the single admin username. Passwords are not required.
    if (username !== 'Mr.Duhoki')
      return json({ error: 'Incorrect username.' }, 401);
    const token =
      crypto.randomUUID().replaceAll('-', '') +
      crypto.randomUUID().replaceAll('-', '');
    await db()
      .prepare('INSERT INTO sessions(hash,expires) VALUES (?,?)')
      .bind(await digest(token), Date.now() + 8 * 60 * 60 * 1000)
      .run();
    await db()
      .prepare('DELETE FROM sessions WHERE expires<?')
      .bind(Date.now())
      .run();
    return new Response(JSON.stringify({ authenticated: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Set-Cookie': `kennel_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${new URL(req.url).protocol === 'https:' ? '; Secure' : ''}`,
      },
    });
  } catch {
    return json({ error: 'Login is temporarily unavailable.' }, 503);
  }
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Invalid origin' }, 403);
  const token = req.headers
    .get('cookie')
    ?.match(/kennel_session=([a-f0-9]{64})/)?.[1];
  if (token)
    await db()
      .prepare('DELETE FROM sessions WHERE hash=?')
      .bind(await digest(token))
      .run();
  return new Response('{}', {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie':
        'kennel_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0',
    },
  });
}
