import { env } from 'cloudflare:workers';
export const db = () => env.DB;
export const files = () => env.FILES;
export const config = () => env as unknown as Record<string, string>;
export const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
export async function digest(value: string) {
  return Array.from(
    new Uint8Array(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)),
    ),
  )
    .map((n) => n.toString(16).padStart(2, '0'))
    .join('');
}
export async function admin(req: Request) {
  const token = req.headers
    .get('cookie')
    ?.match(/(?:^|;\s*)kennel_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  if (!token) return false;
  return !!(await db()
    .prepare('SELECT hash FROM sessions WHERE hash=? AND expires>?')
    .bind(await digest(token), Date.now())
    .first());
}
export function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  return !!origin && origin === new URL(req.url).origin;
}
export async function rate(
  req: Request,
  scope: string,
  max: number,
  period = 600000,
) {
  const ip = req.headers.get('cf-connecting-ip') || 'local';
  const key = await digest(scope + ':' + ip);
  const bucket = Math.floor(Date.now() / period);
  const row = await db()
    .prepare(
      'INSERT INTO rate_limits (key,bucket,count) VALUES (?,?,1) ON CONFLICT(key,bucket) DO UPDATE SET count=count+1 RETURNING count',
    )
    .bind(key, bucket)
    .first<{ count: number }>();
  return (row?.count || 0) <= max;
}
export async function verifyPassword(password: string) {
  const encoded = config().ADMIN_PASSWORD_HASH;
  if (!encoded) return false;
  const [salt, hash] = encoded.split(':');
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: new TextEncoder().encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    256,
  );
  const actual = Array.from(new Uint8Array(bits))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
  let diff = actual.length ^ hash.length;
  for (let i = 0; i < actual.length; i++)
    diff |= actual.charCodeAt(i) ^ hash.charCodeAt(i);
  return diff === 0;
}
