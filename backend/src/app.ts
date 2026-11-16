import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { API_PREFIX, JSON_BODY_LIMIT } from './config/constants.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { createFormLimiter, createGeneralLimiter, type RateLimitOptions } from './middleware/rateLimiters.js';
import type { ReviewRepository } from './repositories/review.repository.js';
import { createApiRouter } from './routes/index.js';
import { ReviewService } from './services/review.service.js';

export interface AppDependencies {
  reviewRepository: ReviewRepository;
  corsOrigins: string[];
  trustProxy: number;
  rateLimit: { general: RateLimitOptions; form: RateLimitOptions };
}

/** Builds the Express app. Dependencies are injected so tests can run without MySQL. */
export function createApp(deps: AppDependencies): Express {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', deps.trustProxy);

  app.use(helmet());
  app.use(
    cors({
      origin: deps.corsOrigins,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    }),
  );
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use(API_PREFIX, createGeneralLimiter(deps.rateLimit.general));

  app.use(
    API_PREFIX,
    createApiRouter({
      reviewService: new ReviewService(deps.reviewRepository),
      formLimiter: createFormLimiter(deps.rateLimit.form),
    }),
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
