import { ye } from './data-client';
export function registerKennelTools() {
  const context = (document as any).modelContext;
  if (!context?.registerTool) return;
  const lifecycle = new AbortController();
  try {
    void Promise.resolve(
      context.registerTool(
        {
          name: 'list_available_puppies',
          title: 'List available puppies',
          description:
            'Read the current puppy listings shown on the Available Puppies page.',
          inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
          annotations: { readOnlyHint: true, untrustedContentHint: true },
          async execute(input: unknown) {
            if (
              !input ||
              typeof input !== 'object' ||
              Object.keys(input).length
            )
              throw Error('Use an empty object.');
            const result = await ye.from('Puppies').select().eq('sold', false);
            if (result.error) throw Error(result.error.message);
            return result.data.map(
              ({ id, name, gender, status, price, description }: any) => ({
                id,
                name,
                gender,
                status,
                price,
                description,
              }),
            );
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => {});
  } catch {}
  return () => lifecycle.abort();
}
