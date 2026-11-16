import type { REVIEW_STATUS } from '../config/constants.js';

export type ReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

/** Shape exposed by the public API. */
export interface PublicReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface NewReview {
  name: string;
  rating: number;
  comment: string;
}
