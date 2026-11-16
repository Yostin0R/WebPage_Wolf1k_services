import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import type { Review } from '../../types';
import { brand } from '../../theme/tokens';
import { formatMonthYear } from '../../utils/formatDate';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = formatMonthYear(review.createdAt);

  return (
    <Box
      component="figure"
      sx={{ m: 0, height: '100%', display: 'flex', flexDirection: 'column', p: { xs: 3, md: 3.5 }, bgcolor: brand.white, border: `1px solid ${brand.line}`, borderTop: `4px solid ${brand.red}` }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Rating value={review.rating} readOnly aria-label={`Rated ${review.rating} out of 5 stars`} sx={{ color: brand.yellow }} />
        <FormatQuoteIcon aria-hidden sx={{ fontSize: 36, color: brand.line }} />
      </Box>
      <Typography component="blockquote" sx={{ m: 0, flexGrow: 1, overflowWrap: 'anywhere' }}>
        {review.comment}
      </Typography>
      <Box component="figcaption" sx={{ mt: 3, pt: 2, borderTop: `1px solid ${brand.line}` }}>
        <Typography variant="h4" component="p" sx={{ overflowWrap: 'anywhere' }}>
          {review.name}
        </Typography>
        {date && (
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
