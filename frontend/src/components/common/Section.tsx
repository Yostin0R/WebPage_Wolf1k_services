import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { ReactNode } from 'react';
import { brand, layout } from '../../theme/tokens';

export type SectionTone = 'light' | 'muted' | 'dark';

const TONE_STYLES: Record<SectionTone, { bgcolor: string; color: string }> = {
  light: { bgcolor: brand.white, color: brand.black },
  muted: { bgcolor: brand.offWhite, color: brand.black },
  dark: { bgcolor: brand.black, color: brand.white },
};

interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  /** id of the heading that labels this section (accessibility). */
  labelledBy?: string;
}

/** Page section with consistent vertical rhythm and background tone. */
export function Section({ children, tone = 'light', id, labelledBy }: SectionProps) {
  return (
    <Box component="section" id={id} aria-labelledby={labelledBy} sx={{ ...TONE_STYLES[tone], py: layout.sectionPaddingY }}>
      <Container>{children}</Container>
    </Box>
  );
}
