import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { ROUTES } from '../config/routes';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" />
      <PageHero eyebrow="Error 404" title="Page not found" text="The page you are looking for does not exist or has moved." />
      <Section>
        <Button component={RouterLink} to={ROUTES.home} variant="contained" color="primary" size="large">
          Back to Home
        </Button>
      </Section>
    </>
  );
}
