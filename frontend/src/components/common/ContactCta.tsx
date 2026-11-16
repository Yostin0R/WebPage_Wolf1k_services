import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { brand } from '../../theme/tokens';

const HEADING_ID = 'contact-cta-heading';

/** Closing call to action that points every page to Contact Us. */
export function ContactCta() {
  return (
    <Box component="section" aria-labelledby={HEADING_ID} sx={{ bgcolor: brand.red, color: brand.white, py: { xs: 7, md: 9 } }}>
      <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 4 }}>
        <Box sx={{ borderLeft: `5px solid ${brand.yellow}`, pl: { xs: 2.5, md: 4 } }}>
          <Typography id={HEADING_ID} variant="h2">
            Let&apos;s talk about your next project.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1.5, maxWidth: 560 }}>
            Call or email us and tell us what you have in mind.
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to={ROUTES.contact}
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{
            alignSelf: { xs: 'flex-start', md: 'center' },
            flexShrink: 0,
            bgcolor: brand.black,
            color: brand.white,
            '&:hover': { bgcolor: brand.charcoal, color: brand.yellow },
          }}
        >
          Contact Us
        </Button>
      </Container>
    </Box>
  );
}
