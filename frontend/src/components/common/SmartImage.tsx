import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { useState } from 'react';
import { brand } from '../../theme/tokens';

interface SmartImageProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 3". Reserves space so the layout never shifts. */
  ratio?: string;
  /** Load immediately (use for above-the-fold images only). */
  eager?: boolean;
  /** Subtle zoom when the parent `.zoom-parent` is hovered or focused. */
  zoom?: boolean;
  sx?: SxProps<Theme>;
}

/** Image with reserved aspect ratio, lazy loading and a visual fallback if it fails to load. */
export function SmartImage({ src, alt, ratio = '4 / 3', eager = false, zoom = false, sx }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <Box sx={[{ aspectRatio: ratio, overflow: 'hidden', bgcolor: brand.offWhite, position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {failed ? (
        <Box
          role="img"
          aria-label={alt}
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            p: 2,
            color: brand.textMuted,
            textAlign: 'center',
          }}
        >
          <BrokenImageOutlinedIcon fontSize="large" aria-hidden />
          <Typography variant="body2">Image unavailable</Typography>
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 600ms ease',
            ...(zoom && {
              '.zoom-parent:hover &, .zoom-parent:focus-within &': { transform: 'scale(1.05)' },
            }),
          }}
        />
      )}
    </Box>
  );
}
