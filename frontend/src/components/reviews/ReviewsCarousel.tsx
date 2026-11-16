import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useRef } from 'react';
import type { Review } from '../../types';
import { brand } from '../../theme/tokens';
import { ReviewCard } from './ReviewCard';

interface ReviewsCarouselProps {
  reviews: Review[];
}

const arrowStyles = {
  border: `2px solid ${brand.black}`,
  borderRadius: 0.5,
  color: brand.black,
  '&:hover': { bgcolor: brand.red, borderColor: brand.red, color: brand.white },
} as const;

/**
 * Simple carousel built on native horizontal scrolling with scroll-snap:
 * works with touch, trackpad and keyboard, with arrows as an extra control.
 */
export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    track?.scrollBy?.({ left: direction * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <Box role="region" aria-roledescription="carousel" aria-label="Customer reviews">
      <Box
        component="ul"
        ref={trackRef}
        tabIndex={0}
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          pb: 1,
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: { xs: '100%', sm: 'calc((100% - 24px) / 2)', md: 'calc((100% - 48px) / 3)' },
          gap: 3,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'thin',
        }}
      >
        {reviews.map((review) => (
          <Box component="li" key={review.id} sx={{ scrollSnapAlign: 'start', minWidth: 0 }}>
            <ReviewCard review={review} />
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 3, display: 'flex', gap: 1.5 }}>
        <IconButton aria-label="Previous reviews" onClick={() => scrollByPage(-1)} sx={arrowStyles}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton aria-label="Next reviews" onClick={() => scrollByPage(1)} sx={arrowStyles}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
