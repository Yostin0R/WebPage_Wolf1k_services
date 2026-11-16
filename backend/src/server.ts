import { createApp } from './app.js';
import { API_PREFIX } from './config/constants.js';
import { env } from './config/env.js';
import { closePool, getPool } from './database/pool.js';
import { MySqlReviewRepository } from './repositories/review.repository.js';
import { logger } from './utils/logger.js';

const pool = getPool();

const app = createApp({
  reviewRepository: new MySqlReviewRepository(pool),
  corsOrigins: env.corsOrigins,
  trustProxy: env.trustProxy,
  rateLimit: {
    general: { windowMs: env.rateLimit.windowMs, max: env.rateLimit.max },
    form: { windowMs: env.rateLimit.formWindowMs, max: env.rateLimit.formMax },
  },
});

const server = app.listen(env.port, () => {
  logger.info(`wolf1k-api listening on http://localhost:${env.port}${API_PREFIX}`);
});

function shutdown(signal: string): void {
  logger.info(`${signal} received, shutting down`);
  server.close(() => {
    void closePool().finally(() => process.exit(0));
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
