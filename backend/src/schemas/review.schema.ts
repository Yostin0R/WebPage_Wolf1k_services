import { z } from 'zod';
import { FIELD_LIMITS } from '../config/constants.js';
import { sanitizeSingleLine, sanitizeText } from '../utils/sanitize.js';

const { reviewName, reviewComment, rating } = FIELD_LIMITS;

export const createReviewSchema = z.strictObject({
  name: z
    .string({ error: 'Name is required' })
    .transform(sanitizeSingleLine)
    .pipe(
      z
        .string()
        .min(reviewName.min, `Name must be at least ${reviewName.min} characters`)
        .max(reviewName.max, `Name must be at most ${reviewName.max} characters`),
    ),
  rating: z
    .number({ error: 'Rating must be a number from 1 to 5' })
    .int('Rating must be a whole number')
    .min(rating.min, 'Rating must be between 1 and 5')
    .max(rating.max, 'Rating must be between 1 and 5'),
  comment: z
    .string({ error: 'Review is required' })
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(reviewComment.min, `Review must be at least ${reviewComment.min} characters`)
        .max(reviewComment.max, `Review must be at most ${reviewComment.max} characters`),
    ),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
