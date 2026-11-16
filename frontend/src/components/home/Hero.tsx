import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { brandAssets, company } from '../../config/company';
import { ROUTES } from '../../config/routes';
import { heroContent } from '../../data/home';
import { brand } from '../../theme/tokens';
import { HeroFeatures } from './HeroFeatures';

/** Large logo on the right of the hero. Renders nothing until the logo file exists. */
function HeroLogo() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Box
      component="img"
      src={brandAssets.logo}
      alt=""
      aria-hidden
      onError={() => setFailed(true)}
      sx={{ width: '100%', maxWidth: 460, height: 'auto', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.6))' }}
    />
  );
}

export function Hero() {
  return (
    <Box component="section" aria-labelledby="hero-heading" sx={{ position: 'relative', bgcolor: brand.black, color: brand.white, overflow: 'hidden' }}>
      <Box
        component="img"
        src={heroContent.image}
        alt={heroContent.imageAlt}
        fetchPriority="high"
        sx={{ position: 'absolute', top: 0, right: 0, width: { xs: '100%', md: '62%' }, height: '100%', objectFit: 'cover' }}
      />
      {/* Scrim: solid black behind the text, fading out over the photo. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: {
            xs: 'rgba(17,17,17,0.86)',
            md: 'linear-gradient(90deg, #111111 0%, #111111 38%, rgba(17,17,17,0.82) 56%, rgba(17,17,17,0.3) 100%)',
          },
        }}
      />

      <Container
        sx={{
          position: 'relative',
          display: 'grid',
          alignItems: 'center',
          gap: 4,
          gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
          py: { xs: 6, md: 8 },
          minHeight: { md: 600 },
        }}
      >
        <Box sx={{ animation: 'heroIn 700ms ease both', '@keyframes heroIn': { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'none' } } }}>
          <Box aria-hidden sx={{ width: 56, height: 4, bgcolor: brand.yellow, mb: 2 }} />
          <Typography id="hero-heading" variant="h1" sx={{ fontSize: 'clamp(2.4rem, 6.2vw, 4.5rem)' }}>
            {heroContent.titleTop}{' '}
            <Box component="span" sx={{ display: 'block', color: brand.yellow }}>
              {heroContent.titleAccent}
            </Box>{' '}
            <Box component="span" sx={{ display: 'block', fontSize: '0.62em', mt: 0.5 }}>
              {heroContent.titleBottom}
            </Box>
          </Typography>
          <Typography sx={{ mt: 2.5, maxWidth: 520, fontSize: { xs: '1rem', md: '1.1rem' }, color: 'rgba(255,255,255,0.88)' }}>
            {heroContent.subtitle}
          </Typography>

          <HeroFeatures />

          <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button component={RouterLink} to={ROUTES.contact} variant="contained" color="primary" size="large" endIcon={<ChevronRightIcon />}>
              {heroContent.primaryCta}
            </Button>
            <Button
              component={RouterLink}
              to={ROUTES.projects}
              variant="outlined"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{ color: brand.white, borderColor: 'rgba(255,255,255,0.7)', borderWidth: 2, bgcolor: 'rgba(17,17,17,0.6)', '&:hover': { borderWidth: 2, borderColor: brand.yellow, color: brand.yellow, bgcolor: 'rgba(17,17,17,0.85)' } }}
            >
              {heroContent.secondaryCta}
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }} aria-label={company.shortName}>
          <HeroLogo />
        </Box>
      </Container>
    </Box>
  );
}
