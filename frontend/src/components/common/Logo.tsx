import Box from '@mui/material/Box';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { brandAssets, company } from '../../config/company';
import { ROUTES } from '../../config/routes';
import { brand, fonts } from '../../theme/tokens';

interface LogoProps {
  /** Use on dark backgrounds. */
  inverted?: boolean;
  height?: number;
}

/**
 * Company logo linking home. Renders the official image from the centralised
 * brand path and falls back to a text wordmark if the file is missing.
 */
export function Logo({ inverted = false, height = 48 }: LogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Box
      component={RouterLink}
      to={ROUTES.home}
      aria-label={`${company.shortName} - Home`}
      sx={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
    >
      {imageFailed ? (
        <Box component="span" sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1, fontFamily: fonts.heading }}>
          <Box component="span" sx={{ fontSize: height * 0.6, fontWeight: 700, letterSpacing: '0.02em', color: inverted ? brand.white : brand.black }}>
            WOLF
            <Box component="span" sx={{ color: brand.red }}>
              1K
            </Box>
          </Box>
          <Box component="span" sx={{ fontSize: height * 0.24, fontWeight: 600, letterSpacing: '0.42em', color: inverted ? brand.yellow : brand.textMuted }}>
            SERVICES
          </Box>
        </Box>
      ) : (
        <Box
          component="img"
          src={brandAssets.logo}
          alt={company.shortName}
          onError={() => setImageFailed(true)}
          sx={{ height, width: 'auto' }}
        />
      )}
    </Box>
  );
}
