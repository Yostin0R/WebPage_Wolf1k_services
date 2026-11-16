import type { ReviewRepository } from '../repositories/review.repository.js';
import type { CreateReviewInput } from '../schemas/review.schema.js';
import type { PublicReview } from '../types/review.js';

export class ReviewService {
  constructor(private readonly reviews: ReviewRepository) {}

  listApproved(): Promise<PublicReview[]> {
    return this.reviews.findApproved();
  }

  /** New reviews always start as pending; they are published only after approval. */
  async submit(input: CreateReviewInput): Promise<void> {
    await this.reviews.create(input);
  }
}
