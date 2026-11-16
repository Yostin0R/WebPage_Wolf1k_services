import type { FieldErrors, NewReview } from '../types';

/** Mirrors the limits enforced by the API (backend/src/config/constants.ts). */
export const LIMITS = {
  reviewName: { min: 2, max: 80 },
  reviewComment: { min: 10, max: 1000 },
} as const;

function lengthError(value: string, label: string, min: number, max: number): string | undefined {
  const length = value.trim().length;
  if (length === 0) return `${label} is required`;
  if (length < min) return `${label} must be at least ${min} characters`;
  if (length > max) return `${label} must be at most ${max} characters`;
  return undefined;
}

/** Removes undefined entries so "no errors" is an empty object. */
function compact<T>(errors: FieldErrors<T>): FieldErrors<T> {
  return Object.fromEntries(Object.entries(errors).filter(([, value]) => value)) as FieldErrors<T>;
}

export interface ReviewFormValues {
  name: string;
  rating: number | null;
  comment: string;
}

export function validateReview(values: ReviewFormValues): FieldErrors<NewReview> {
  return compact<NewReview>({
    name: lengthError(values.name, 'Name', LIMITS.reviewName.min, LIMITS.reviewName.max),
    rating: values.rating && values.rating >= 1 && values.rating <= 5 ? undefined : 'Please select a rating',
    comment: lengthError(values.comment, 'Review', LIMITS.reviewComment.min, LIMITS.reviewComment.max),
  });
}

export const hasErrors = (errors: object): boolean => Object.keys(errors).length > 0;
