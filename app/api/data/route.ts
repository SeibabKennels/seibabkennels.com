import { admin, db, json, rate, sameOrigin } from '@/lib/server';
const fields: Record<string, string[]> = {
  Puppies: [
    'name',
    'gender',
    'price',
    'status',
    'description',
    'image_url',
    'gallery_urls',
    'pedigree_url',
    'featured',
    'sold',
  ],
  Studs: [
    'name',
    'fee',
    'status',
    'bloodline',
    'description',
    'image_url',
    'gallery_urls',
    'pedigree_url',
    'featured',
  ],
  WhatsNew: [
    'title',
    'tag',
    'description',
    'image_url',
    'button_text',
    'redirect_path',
    'active',
    'featured',
  ],
  UpcomingBreedings: [
    'title',
    'sire',
    'dam',
    'expected_date',
    'status',
    'description',
    'image_url',
    'sire_image_url',
    'dam_image_url',
    'active',
    'featured',
  ],
  Messages: ['name', 'email', 'phone', 'message', 'status'],
  Reviews: ['name', 'email', 'rating', 'review', 'image_url', 'approved'],
  DepositRequests: [
    'name',
    'email',
    'phone',
    'interested_in',
    'interest_type',
    'deposit_type',
    'message',
    'status',
  ],
  Analytics: ['item_type', 'item_id', 'item_name', 'action'],
  Settings: ['content'],
};
const publicRead = new Set([
  'Puppies',
  'Studs',
  'WhatsNew',
  'UpcomingBreedings',
  'Reviews',
  'Settings',
]);
const publicWrite = new Set([
  'Messages',
  'Reviews',
  'DepositRequests',
  'Analytics',
]);
function clean(kind: string, value: any, owner: boolean) {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw Error('Invalid record');
  const out: any = {};
  for (const k of fields[kind]) {
    if (!(k in value)) continue;
    const v = value[k];
    if (k === 'content') {
      if (
        typeof v !== 'object' ||
        Array.isArray(v) ||
        JSON.stringify(v).length > 80000
      )
        throw Error('Invalid content');
      out[k] = v;
      continue;
    }
    if (['featured', 'sold', 'active', 'approved'].includes(k)) {
      if (typeof v !== 'boolean') throw Error('Invalid toggle');
      out[k] = v;
      continue;
    }
    if (k === 'gallery_urls') {
      if (!Array.isArray(v) || v.length > 30)
        throw Error('Use up to 30 photos');
      out[k] = v.map(url);
      continue;
    }
    if (k.endsWith('_url')) {
      out[k] = v ? url(v) : null;
      continue;
    }
    if (k === 'rating') {
      if (!Number.isInteger(v) || v < 1 || v > 5)
        throw Error('Choose a rating from 1 to 5');
      out[k] = v;
      continue;
    }
    if (k === 'redirect_path') {
      if (typeof v !== 'string' || !/^\/(?!\/)/.test(v))
        throw Error('Use a page path beginning with /');
      out[k] = v;
      continue;
    }
    if (typeof v !== 'string' && typeof v !== 'number')
      throw Error('Invalid ' + k);
    if (String(v).length > 10000) throw Error('Text is too long');
    out[k] = v;
  }
  if (!owner) {
    if (kind === 'Reviews') out.approved = false;
    if (kind === 'Messages' || kind === 'DepositRequests') out.status = 'New';
    if (kind !== 'Analytics') {
      if (!out.name?.trim() || !/^\S+@\S+\.\S+$/.test(out.email || ''))
        throw Error('Enter your name and a valid email');
      if (!(out.message || out.review)?.trim())
        throw Error('Enter your message');
    } else if (!['view', 'inquiry'].includes(out.action))
      throw Error('Invalid action');
  }
  return out;
}
function url(v: unknown) {
  if (
    typeof v !== 'string' ||
    v.length > 2000 ||
    !/^(\/assets\/|\/api\/media\/|https:\/\/)/.test(v)
  )
    throw Error('Invalid file URL');
  return v;
}
export async function POST(req: Request) {
  try {
    if (!sameOrigin(req))
      return json({ error: { message: 'Invalid origin' } }, 403);
    if (Number(req.headers.get('content-length') || 0) > 100000)
      return json({ error: { message: 'Request too large' } }, 413);
    const body = (await req.json()) as any;
    const {
      table,
      op = 'select',
      data,
      filters = [],
      orders = [],
      limit = 200,
    } = body;
    if (!fields[table])
      return json({ error: { message: 'Unknown collection' } }, 400);
    const owner = await admin(req);
    if (op === 'select') {
      if (!owner && !publicRead.has(table))
        return json({ error: { message: 'Sign in required' } }, 401);
      const rows = await db()
        .prepare(
          'SELECT id,data,created_at FROM records WHERE kind=? ORDER BY created_at DESC LIMIT 1000',
        )
        .bind(table)
        .all<any>();
      let records = rows.results.map((r) => ({
        ...JSON.parse(r.data),
        id: r.id,
        created_at: r.created_at,
      }));
      if (!owner) {
        records = records
          .filter((r) =>
            table === 'Reviews'
              ? r.approved === true
              : table === 'WhatsNew' || table === 'UpcomingBreedings'
                ? r.active === true
                : true,
          )
          .map(({ email, phone, ...r }) => r);
      }
      for (const [key, value] of filters) {
        if (![...fields[table], 'id'].includes(key))
          return json({ error: { message: 'Invalid filter' } }, 400);
        records = records.filter((r) => String(r[key]) === String(value));
      }
      for (const [key, ascending] of [...orders].reverse()) {
        records.sort((a, b) => {
          let x = a[key] ?? '',
            y = b[key] ?? '';
          return (x < y ? -1 : x > y ? 1 : 0) * (ascending ? 1 : -1);
        });
      }
      return json({
        data: records.slice(
          0,
          Math.min(1000, Math.max(1, Number(limit) || 200)),
        ),
        error: null,
      });
    }
    if (!owner && !(op === 'insert' && publicWrite.has(table)))
      return json({ error: { message: 'Owner login required' } }, 401);
    if (!owner && !(await rate(req, table, table === 'Analytics' ? 100 : 8)))
      return json(
        { error: { message: 'Too many submissions. Please try again later.' } },
        429,
      );
    if (op === 'insert') {
      if (
        !Array.isArray(data) ||
        data.length < 1 ||
        data.length > (owner ? 50 : 1)
      )
        throw Error('Invalid record count');
      const records = data.map((v) => ({
        id: crypto.randomUUID(),
        data: clean(table, v, owner),
        created_at: new Date().toISOString(),
      }));
      await db().batch(
        records.map((r) =>
          db()
            .prepare(
              'INSERT INTO records(id,kind,data,created_at) VALUES (?,?,?,?)',
            )
            .bind(r.id, table, JSON.stringify(r.data), r.created_at),
        ),
      );
      return json({
        data: records.map((r) => ({
          ...r.data,
          id: r.id,
          created_at: r.created_at,
        })),
        error: null,
      });
    }
    const id = filters.find(([k]: string[]) => k === 'id')?.[1];
    if (typeof id !== 'string') throw Error('Choose a record');
    if (op === 'delete') {
      await db()
        .prepare('DELETE FROM records WHERE id=? AND kind=?')
        .bind(id, table)
        .run();
      return json({ data: [], error: null });
    }
    if (op === 'update') {
      const patch = clean(table, data, true);
      const result = await db()
        .prepare(
          'UPDATE records SET data=json_patch(data,?) WHERE id=? AND kind=? RETURNING data',
        )
        .bind(JSON.stringify(patch), id, table)
        .first();
      if (!result)
        return json({ error: { message: 'Record no longer exists' } }, 404);
      return json({ data: [], error: null });
    }
    throw Error('Unknown action');
  } catch (e) {
    return json(
      { error: { message: e instanceof Error ? e.message : 'Unable to save' } },
      400,
    );
  }
}
