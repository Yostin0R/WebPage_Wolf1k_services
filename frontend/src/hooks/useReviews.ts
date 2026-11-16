import { useEffect, useState } from 'react';
import { fetchReviews } from '../api/reviews';
import type { Review } from '../types';

export type ReviewsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; reviews: Review[] };

/** Loads approved reviews from the API. */
export function useReviews(): ReviewsState {
  const [state, setState] = useState<ReviewsState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    fetchReviews(controller.signal)
      .then((reviews) => setState({ status: 'ready', reviews }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' });
      });
    return () => controller.abort();
  }, []);

  return state;
}
