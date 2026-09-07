import { admin, files, json, rate, sameOrigin } from '@/lib/server';
export async function POST(req: Request) {
  try {
    if (!sameOrigin(req)) return json({ error: 'Invalid origin' }, 403);
    const owner = await admin(req);
    if (!owner && !(await rate(req, 'upload', 5)))
      return json({ error: 'Too many uploads' }, 429);
    if (Number(req.headers.get('content-length') || 0) > 21 * 1024 * 1024)
      return json({ error: 'File too large' }, 413);
    const form = await req.formData();
    const file = form.get('file');
    if (
      !(file instanceof File) ||
      file.size > (owner ? 20 : 5) * 1024 * 1024 ||
      file.size === 0
    )
      return json(
        { error: 'Choose a file up to ' + (owner ? 20 : 5) + ' MB' },
        400,
      );
    if (!owner && form.get('category') !== 'reviews')
      return json({ error: 'Owner login required' }, 401);
    const buf = await file.arrayBuffer();
    const b = new Uint8Array(buf);
    const jpeg = b[0] === 255 && b[1] === 216 && b[2] === 255;
    const png = b[0] === 137 && b[1] === 80 && b[2] === 78 && b[3] === 71;
    const webp =
      String.fromCharCode(...b.slice(0, 4)) === 'RIFF' &&
      String.fromCharCode(...b.slice(8, 12)) === 'WEBP';
    const pdf = owner && String.fromCharCode(...b.slice(0, 5)) === '%PDF-';
    const type = jpeg
      ? 'image/jpeg'
      : png
        ? 'image/png'
        : webp
          ? 'image/webp'
          : pdf
            ? 'application/pdf'
            : null;
    if (!type)
      return json(
        { error: 'Use a JPG, PNG, WebP image' + (owner ? ' or PDF' : '') },
        400,
      );
    const id =
      crypto.randomUUID() +
      (jpeg ? '.jpg' : png ? '.png' : webp ? '.webp' : '.pdf');
    await files().put(id, buf, { httpMetadata: { contentType: type } });
    return json({ path: id });
  } catch {
    return json({ error: 'Upload failed. Please try again.' }, 500);
  }
}
