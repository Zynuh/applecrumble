import "server-only";

import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  supabaseDatabasePool?: Pool;
};

function getDatabasePool(): Pool {
  if (globalForDatabase.supabaseDatabasePool) {
    return globalForDatabase.supabaseDatabasePool;
  }

  const connectionLink = process.env.DB_DIRECT_CONNECTION_LINK;
  const password = process.env.DB_PASSWORD;

  if (!connectionLink || !password) {
    throw new Error(
      "DB_DIRECT_CONNECTION_LINK and DB_PASSWORD must be set to connect to Supabase.",
    );
  }

  let connectionUrl: URL;
  try {
    connectionUrl = new URL(connectionLink);
  } catch {
    throw new Error("DB_DIRECT_CONNECTION_LINK must be a valid PostgreSQL URL.");
  }

  if (
    (connectionUrl.protocol !== "postgres:" &&
      connectionUrl.protocol !== "postgresql:") ||
    !connectionUrl.hostname
  ) {
    throw new Error("DB_DIRECT_CONNECTION_LINK must be a valid PostgreSQL URL.");
  }

  connectionUrl.password = password;

  globalForDatabase.supabaseDatabasePool = new Pool({
    connectionString: connectionUrl.toString(),
    connectionTimeoutMillis: 10_000,
    max: 5,
  });

  return globalForDatabase.supabaseDatabasePool;
}

export async function checkDatabaseConnection(): Promise<void> {
  await getDatabasePool().query("select 1");
}
