/** Design tokens. Priority: red (primary) > yellow (accent) > black (support). */
export const brand = {
  red: '#D71920',
  redDark: '#A81117',
  redLight: '#E5484D',
  yellow: '#FFC400',
  yellowDark: '#D9A600',
  black: '#111111',
  charcoal: '#1C1C1C',
  white: '#FFFFFF',
  offWhite: '#F7F7F7',
  line: '#E4E4E4',
  textMuted: '#5A5A5A',
} as const;

export const fonts = {
  heading: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif',
  body: '"Barlow", "Helvetica Neue", Arial, sans-serif',
} as const;

export const layout = {
  sectionPaddingY: { xs: 8, md: 12 },
  navHeight: { xs: 64, md: 76 },
} as const;

/** Hides content visually while keeping it available to screen readers. */
export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;
