import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/demlab";

const connectionUrl = new URL(databaseUrl);
if (connectionUrl.hostname.endsWith("supabase.com")) {
  // pg-connection-string treats sslmode=require as certificate verification and
  // otherwise overwrites the Pool's TLS options. Supabase poolers use a managed chain.
  connectionUrl.searchParams.set("sslmode", "no-verify");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: connectionUrl.toString(),
    max: 5,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 10_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
