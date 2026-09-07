import { files } from '@/lib/server';
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!/^[a-f0-9-]+\.(jpg|png|webp|pdf)$/.test(id))
    return new Response('Not found', { status: 404 });
  const object = await files().get(id);
  if (!object) return new Response('Not found', { status: 404 });
  return new Response(object.body, {
    headers: {
      'Content-Type':
        object.httpMetadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; sandbox",
      ...(id.endsWith('.pdf')
        ? { 'Content-Disposition': 'attachment; filename="pedigree.pdf"' }
        : {}),
    },
  });
}
