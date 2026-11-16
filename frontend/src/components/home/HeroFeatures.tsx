import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DoorFrontOutlinedIcon from '@mui/icons-material/DoorFrontOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { heroFeatures, type HeroFeatureIcon } from '../../data/home';
import { brand, fonts } from '../../theme/tokens';

const ICONS: Record<HeroFeatureIcon, ReactElement> = {
  baseboards: <StraightenOutlinedIcon />,
  panels: <DashboardOutlinedIcon />,
  crown: <WorkspacePremiumOutlinedIcon />,
  custom: <CarpenterOutlinedIcon />,
  doors: <DoorFrontOutlinedIcon />,
  residential: <HomeRepairServiceOutlinedIcon />,
};

/** Two-column list of key services with yellow outlined icons. */
export function HeroFeatures() {
  return (
    <Box
      component="ul"
      aria-label="Key services"
      sx={{ listStyle: 'none', p: 0, m: 0, mt: 3.5, maxWidth: 560, display: 'grid', columnGap: 3, rowGap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}
    >
      {heroFeatures.map((feature) => (
        <Box component="li" key={feature.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            aria-hidden
            sx={{ flexShrink: 0, width: 42, height: 42, display: 'grid', placeItems: 'center', color: brand.yellow, border: `2px solid ${brand.yellow}`, borderRadius: 0.5 }}
          >
            {ICONS[feature.icon]}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.15 }}>
              {feature.title}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
              {feature.text}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
