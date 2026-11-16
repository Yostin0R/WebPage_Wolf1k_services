/** User-facing status messages shared by the review form and tests. */
export const MESSAGES = {
  reviews: {
    submitting: 'Submitting...',
    success: 'Thank you! Your review has been submitted for approval.',
    error: 'Unable to submit your review.',
    loadError: 'Reviews are unavailable right now. Please check back soon.',
    empty: 'No reviews have been published yet. Be the first to share your experience.',
  },
  rateLimited: 'Too many attempts. Please try again later.',
} as const;
