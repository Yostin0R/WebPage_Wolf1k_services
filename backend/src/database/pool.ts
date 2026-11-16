import mysql, { type Pool } from 'mysql2/promise';
import { env } from '../config/env.js';

let pool: Pool | undefined;

/** Lazily creates the shared connection pool. */
export function getPool(): Pool {
  pool ??= mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    connectionLimit: env.db.connectionLimit,
    waitForConnections: true,
    charset: 'utf8mb4',
    timezone: 'Z',
    // Prepared statements only; never allow stacked queries from the app.
    multipleStatements: false,
  });
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
