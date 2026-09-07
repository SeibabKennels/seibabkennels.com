import { ye } from './data-client';
const queued = new Map();
let chain = Promise.resolve();
let pending = 0;
function signal() {
  window.dispatchEvent(new CustomEvent('kennel-saving', { detail: pending }));
}
export function saveField(table, id, field, value, setter) {
  setter((rows) =>
    rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
  );
  const key = table + id + field;
  const prior = queued.get(key);
  if (prior) {
    clearTimeout(prior.timer);
    prior.resolve();
    pending--;
  }
  pending++;
  signal();
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      queued.delete(key);
      chain = chain.then(async () => {
        try {
          await ye
            .from(table)
            .update({ [field]: value })
            .eq('id', id);
        } finally {
          pending--;
          signal();
          resolve();
        }
      });
    }, 400);
    queued.set(key, { timer, resolve });
  });
}
if (typeof window !== 'undefined')
  window.addEventListener('beforeunload', (e) => {
    if (pending) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
