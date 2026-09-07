let values: Record<string, string> = {};
export const setContent = (v: Record<string, string>) => {
  values = v || {};
};
export const translated = (v: unknown): unknown =>
  typeof v === 'string'
    ? (values[v] ?? v)
    : Array.isArray(v)
      ? v.map(translated)
      : v;
