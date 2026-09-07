// Compatibility layer for recovered views; authorization is exclusively server-side.
const notify = (message) =>
  window.dispatchEvent(new CustomEvent('kennel-error', { detail: message }));
function query(table) {
  const body = { table, op: 'select', filters: [], orders: [] };
  let promise;
  const api = {
    select() {
      return api;
    },
    eq(k, v) {
      body.filters.push([k, v]);
      return api;
    },
    order(k, { ascending = true } = {}) {
      body.orders.push([k, ascending]);
      return api;
    },
    limit(n) {
      body.limit = n;
      return api;
    },
    insert(data) {
      body.op = 'insert';
      body.data = data;
      return api;
    },
    update(data) {
      body.op = 'update';
      body.data = data;
      return api;
    },
    delete() {
      body.op = 'delete';
      return api;
    },
    then(resolve, reject) {
      promise ??= fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.error) notify(r.error.message);
          return r;
        })
        .catch(() => {
          const error = {
            message: 'Connection failed. Your changes were not saved.',
          };
          notify(error.message);
          return { data: null, error };
        });
      return promise.then(resolve, reject);
    },
  };
  return api;
}
/** @type {any} */
export const ye = {
  from: query,
  storage: {
    from: () => ({
      async upload(path, file) {
        try {
          const body = new FormData();
          body.set('file', file);
          body.set(
            'category',
            path.startsWith('reviews/') ? 'reviews' : 'owner',
          );
          const r = await fetch('/api/upload', { method: 'POST', body });
          const result = await r.json();
          if (!r.ok) return { error: { message: result.error } };
          return { data: { path: result.path }, error: null };
        } catch {
          return { error: { message: 'Upload failed' } };
        }
      },
      getPublicUrl(path) {
        return { data: { publicUrl: '/api/media/' + path } };
      },
    }),
  },
};
