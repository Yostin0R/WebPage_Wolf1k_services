export const API_PREFIX = '/api/v1';
export const SERVICE_NAME = 'wolf1k-api';

/** Largest JSON body the API accepts. Forms are small; this blocks oversized payloads. */
export const JSON_BODY_LIMIT = '10kb';

export const REVIEW_STATUS = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
} as const;

export const FIELD_LIMITS = {
  reviewName: { min: 2, max: 80 },
  reviewComment: { min: 10, max: 1000 },
  rating: { min: 1, max: 5 },
} as const;

/** Maximum number of approved reviews returned by GET /reviews. */
export const REVIEWS_PAGE_SIZE = 50;
