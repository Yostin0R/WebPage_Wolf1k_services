/**
 * Applies database/schema.sql (and database/seed.sql with --seed).
 * Usage: npm run db:init   |   npm run db:seed
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

const sqlDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../database');

async function run(): Promise<void> {
  const withSeed = process.argv.includes('--seed');
  if (withSeed && env.isProduction) {
    throw new Error('Refusing to load sample seed data when NODE_ENV=production');
  }

  // Dedicated connection: multipleStatements is enabled only for these trusted local files.
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    multipleStatements: true,
  });

  try {
    await connection.query(await readFile(path.join(sqlDir, 'schema.sql'), 'utf8'));
    logger.info('Schema applied');
    if (withSeed) {
      await connection.query(await readFile(path.join(sqlDir, 'seed.sql'), 'utf8'));
      logger.info('Sample seed data inserted');
    }
  } finally {
    await connection.end();
  }
}

run().catch((error: unknown) => {
  logger.error('Database initialisation failed', error);
  process.exitCode = 1;
});
