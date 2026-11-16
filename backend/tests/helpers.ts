import type { Express } from 'express';
import { createApp, type AppDependencies } from '../src/app.js';
import type { ReviewRepository } from '../src/repositories/review.repository.js';
import type { NewReview, PublicReview, ReviewStatus } from '../src/types/review.js';

interface StoredReview extends PublicReview {
  status: ReviewStatus;
}

/** In-memory stand-in for MySQL that mirrors the repository contract. */
export class InMemoryReviewRepository implements ReviewRepository {
  rows: StoredReview[] = [];
  failNext = false;

  seed(review: Omit<StoredReview, 'id' | 'createdAt'>): void {
    this.rows.push({ ...review, id: this.rows.length + 1, createdAt: new Date().toISOString() });
  }

  async findApproved(): Promise<PublicReview[]> {
    if (this.failNext) {
      this.failNext = false;
      throw new Error("ER_NO_SUCH_TABLE: Table 'wolf1k.reviews' doesn't exist");
    }
    return this.rows
      .filter((row) => row.status === 'approved')
      .map(({ id, name, rating, comment, createdAt }) => ({ id, name, rating, comment, createdAt }));
  }

  async create(review: NewReview): Promise<number> {
    this.seed({ ...review, status: 'pending' });
    return this.rows.length;
  }
}

export interface TestContext {
  app: Express;
  reviews: InMemoryReviewRepository;
}

export function buildTestApp(overrides: Partial<AppDependencies> = {}): TestContext {
  const reviews = new InMemoryReviewRepository();
  const app = createApp({
    reviewRepository: reviews,
    corsOrigins: ['http://localhost:5173'],
    trustProxy: 0,
    rateLimit: {
      general: { windowMs: 60_000, max: 1000 },
      form: { windowMs: 60_000, max: 1000 },
    },
    ...overrides,
  });
  return { app, reviews };
}
