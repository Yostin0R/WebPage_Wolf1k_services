import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { REVIEW_FORM_ANCHOR, ROUTES } from '../../config/routes';
import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';
import { ReviewsList } from './ReviewsList';

const HEADING_ID = 'reviews-heading';

/** Customer reviews block for the home page. */
export function ReviewsSection() {
  return (
    <Section labelledBy={HEADING_ID}>
      <SectionHeading id={HEADING_ID} eyebrow="Customer reviews" title="What Our Customers Say" />
      <ReviewsList layout="carousel" />
      <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button component={RouterLink} to={ROUTES.reviews} variant="contained" color="primary">
          Read All Reviews
        </Button>
        <Button component={RouterLink} to={`${ROUTES.reviews}#${REVIEW_FORM_ANCHOR}`} variant="outlined" color="inherit" sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
          Leave a Review
        </Button>
      </Box>
    </Section>
  );
}
