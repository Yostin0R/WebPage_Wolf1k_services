import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { company } from '../../config/company';
import { brand } from '../../theme/tokens';

const socialLinks = [
  { label: 'Facebook', url: company.social.facebook, icon: <FacebookIcon fontSize="inherit" /> },
  { label: 'Instagram', url: company.social.instagram, icon: <InstagramIcon fontSize="inherit" /> },
];

interface SocialLinksProps {
  /** "boxed" for the footer, "plain" for the compact top bar. */
  variant?: 'boxed' | 'plain';
}

/**
 * Social buttons driven by src/config/company.ts. A network without a URL is
 * rendered as a disabled placeholder instead of an invented link.
 */
export function SocialLinks({ variant = 'boxed' }: SocialLinksProps) {
  const boxed = variant === 'boxed';
  const baseStyles = {
    fontSize: boxed ? 24 : 18,
    p: boxed ? 1 : 0.5,
    borderRadius: 0.5,
    border: boxed ? '1px solid rgba(255,255,255,0.3)' : 'none',
  };

  return (
    <Box sx={{ display: 'flex', gap: boxed ? 1.5 : 0.5 }}>
      {socialLinks.map((social) =>
        social.url ? (
          <IconButton
            key={social.label}
            component="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${company.shortName} on ${social.label}`}
            sx={{
              ...baseStyles,
              color: boxed ? brand.white : brand.yellow,
              '&:hover': boxed ? { color: brand.black, bgcolor: brand.yellow, borderColor: brand.yellow } : { color: brand.white },
            }}
          >
            {social.icon}
          </IconButton>
        ) : (
          <IconButton
            key={social.label}
            disabled
            aria-label={`${social.label} (coming soon)`}
            sx={{ ...baseStyles, '&.Mui-disabled': { color: boxed ? 'rgba(255,255,255,0.45)' : brand.yellow, opacity: boxed ? 1 : 0.75 } }}
          >
            {social.icon}
          </IconButton>
        ),
      )}
    </Box>
  );
}
