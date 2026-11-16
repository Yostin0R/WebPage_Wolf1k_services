import type { NewReview, Review } from '../types';
import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';

interface ReviewsResponse {
  data: Review[];
}

/** Returns approved reviews only (filtering happens on the server). */
export async function fetchReviews(signal?: AbortSignal): Promise<Review[]> {
  const response = await apiClient.get<ReviewsResponse>(ENDPOINTS.reviews, { signal });
  const reviews: unknown = response.data?.data;
  // Guards against a misconfigured VITE_API_URL answering with something that is not the API (e.g. an HTML page).
  if (!Array.isArray(reviews)) throw new Error('Unexpected response from the reviews endpoint');
  return reviews as Review[];
}

/** Submits a review for moderation. It will not be public until approved. */
export async function submitReview(review: NewReview): Promise<void> {
  await apiClient.post(ENDPOINTS.reviews, review);
}
