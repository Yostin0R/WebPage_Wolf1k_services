import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { brand } from '../../theme/tokens';
import type { SectionTone } from './Section';

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  text?: string;
  tone?: SectionTone;
  align?: 'left' | 'center';
}

/** Eyebrow + H2 + optional intro. The yellow tick is the brand's small accent. */
export function SectionHeading({ id, eyebrow, title, text, tone = 'light', align = 'left' }: SectionHeadingProps) {
  const isDark = tone === 'dark';
  const centered = align === 'center';

  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 720, mx: centered ? 'auto' : 0, textAlign: align }}>
      {eyebrow && (
        <Typography
          variant="overline"
          component="p"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 1.5,
            color: isDark ? brand.yellow : brand.red,
            '&::before': { content: '""', width: 32, height: 3, bgcolor: brand.yellow, flexShrink: 0 },
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography id={id} variant="h2">
        {title}
      </Typography>
      {text && (
        <Typography variant="subtitle1" sx={{ mt: 2, color: isDark ? 'rgba(255,255,255,0.78)' : 'text.secondary' }}>
          {text}
        </Typography>
      )}
    </Box>
  );
}
