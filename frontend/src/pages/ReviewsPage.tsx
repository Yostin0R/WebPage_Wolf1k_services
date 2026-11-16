import Box from '@mui/material/Box';
import { ContactCta } from '../components/common/ContactCta';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { SectionHeading } from '../components/common/SectionHeading';
import { Seo } from '../components/common/Seo';
import { ReviewForm } from '../components/reviews/ReviewForm';
import { ReviewsList } from '../components/reviews/ReviewsList';
import { REVIEW_FORM_ANCHOR } from '../config/routes';
import { brand } from '../theme/tokens';

const LIST_ID = 'reviews-list-heading';
const FORM_HEADING_ID = 'review-form-heading';

export default function ReviewsPage() {
  return (
    <>
      <Seo title="Reviews" description="Read what customers say about WOLF1K Services and share your own experience." />
      <PageHero eyebrow="Customer reviews" title="What Our Customers Say" />

      <Section labelledBy={LIST_ID}>
        <SectionHeading id={LIST_ID} title="Customer Reviews" />
        <ReviewsList layout="grid" />
      </Section>

      <Section tone="muted" id={REVIEW_FORM_ANCHOR} labelledBy={FORM_HEADING_ID}>
        <Box sx={{ maxWidth: 680 }}>
          <SectionHeading
            id={FORM_HEADING_ID}
            eyebrow="Share your experience"
            title="Leave a Review"
            text="Worked with us? Tell others how it went. Reviews are published after approval."
            tone="muted"
          />
          <Box sx={{ bgcolor: brand.white, p: { xs: 2.5, md: 4 }, border: `1px solid ${brand.line}` }}>
            <ReviewForm />
          </Box>
        </Box>
      </Section>

      <ContactCta />
    </>
  );
}
