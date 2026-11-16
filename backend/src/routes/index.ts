import { Router, type RequestHandler } from 'express';
import { getHealth } from '../controllers/health.controller.js';
import { ReviewController } from '../controllers/review.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createReviewSchema } from '../schemas/review.schema.js';
import type { ReviewService } from '../services/review.service.js';

export interface RouteDependencies {
  reviewService: ReviewService;
  formLimiter: RequestHandler;
}

export function createApiRouter({ reviewService, formLimiter }: RouteDependencies): Router {
  const router = Router();
  const reviews = new ReviewController(reviewService);

  router.get('/health', getHealth);

  router.get('/reviews', reviews.list);
  router.post('/reviews', formLimiter, validateBody(createReviewSchema), reviews.create);

  return router;
}
