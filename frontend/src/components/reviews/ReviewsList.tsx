import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { MESSAGES } from '../../config/messages';
import { useReviews } from '../../hooks/useReviews';
import { ReviewCard } from './ReviewCard';
import { ReviewsCarousel } from './ReviewsCarousel';

const SKELETON_COUNT = 3;
const gridColumns = { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' };

interface ReviewsListProps {
  /** "carousel" for the home page, "grid" for the full Reviews page. */
  layout: 'carousel' | 'grid';
}

/** Fetches approved reviews and renders loading, error, empty and ready states. */
export function ReviewsList({ layout }: ReviewsListProps) {
  const state = useReviews();

  if (state.status === 'loading') {
    return (
      <Box aria-busy="true" aria-label="Loading reviews" sx={{ display: 'grid', gap: 3, gridTemplateColumns: gridColumns }}>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <Skeleton key={index} variant="rectangular" height={220} />
        ))}
      </Box>
    );
  }

  if (state.status === 'error') {
    return <Alert severity="info">{MESSAGES.reviews.loadError}</Alert>;
  }

  if (state.reviews.length === 0) {
    return <Typography color="text.secondary">{MESSAGES.reviews.empty}</Typography>;
  }

  if (layout === 'carousel') {
    return <ReviewsCarousel reviews={state.reviews} />;
  }

  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3, gridTemplateColumns: gridColumns }}>
      {state.reviews.map((review) => (
        <li key={review.id}>
          <ReviewCard review={review} />
        </li>
      ))}
    </Box>
  );
}
