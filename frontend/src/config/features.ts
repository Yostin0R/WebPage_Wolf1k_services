/**
 * Feature switches.
 *
 * Customer reviews need the backend API (Express + MySQL). They stay hidden
 * until the API is hosted: set VITE_ENABLE_REVIEWS=true (and VITE_API_URL)
 * to show the Reviews section, page and navigation links.
 */
export const FEATURES = {
  reviews: import.meta.env.VITE_ENABLE_REVIEWS === 'true',
} as const;
