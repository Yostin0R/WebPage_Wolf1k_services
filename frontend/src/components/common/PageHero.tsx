import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { brand } from '../../theme/tokens';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  text?: string;
}

/** Banner for inner pages. Holds the page's single H1. */
export function PageHero({ eyebrow, title, text }: PageHeroProps) {
  return (
    <Box sx={{ bgcolor: brand.black, color: brand.white, borderBottom: `6px solid ${brand.red}`, py: { xs: 7, md: 10 } }}>
      <Container>
        <Typography
          variant="overline"
          component="p"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            color: brand.yellow,
            mb: 1.5,
            '&::before': { content: '""', width: 32, height: 3, bgcolor: brand.yellow },
          }}
        >
          {eyebrow}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
          {title}
        </Typography>
        {text && (
          <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: 640, color: 'rgba(255,255,255,0.78)' }}>
            {text}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
