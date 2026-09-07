import {
  sqliteTable,
  text,
  integer,
  index,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
export const records = sqliteTable(
  'records',
  {
    id: text('id').primaryKey(),
    kind: text('kind').notNull(),
    data: text('data').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (t) => [index('records_kind').on(t.kind)],
);
export const sessions = sqliteTable('sessions', {
  hash: text('hash').primaryKey(),
  expires: integer('expires').notNull(),
});
export const limits = sqliteTable(
  'rate_limits',
  {
    key: text('key').notNull(),
    bucket: integer('bucket').notNull(),
    count: integer('count').notNull(),
  },
  (t) => [primaryKey({ columns: [t.key, t.bucket] })],
);
