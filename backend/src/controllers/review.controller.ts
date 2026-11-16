import type { Request, Response } from 'express';
import type { CreateReviewInput } from '../schemas/review.schema.js';
import type { ReviewService } from '../services/review.service.js';

export const REVIEW_SUBMITTED_MESSAGE = 'Thank you! Your review has been submitted for approval.';

export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  list = async (_req: Request, res: Response): Promise<void> => {
    res.json({ data: await this.service.listApproved() });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    await this.service.submit(req.body as CreateReviewInput);
    res.status(201).json({ message: REVIEW_SUBMITTED_MESSAGE });
  };
}
