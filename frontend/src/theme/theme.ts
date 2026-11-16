import { createTheme } from '@mui/material/styles';
import { brand, fonts } from './tokens';

const headingBase = {
  fontFamily: fonts.heading,
  fontWeight: 700,
  textTransform: 'uppercase',
  lineHeight: 1.05,
  letterSpacing: '0.01em',
} as const;

export const theme = createTheme({
  palette: {
    primary: { main: brand.red, dark: brand.redDark, light: brand.redLight, contrastText: brand.white },
    secondary: { main: brand.yellow, dark: brand.yellowDark, contrastText: brand.black },
    background: { default: brand.white, paper: brand.white },
    text: { primary: brand.black, secondary: brand.textMuted },
    divider: brand.line,
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: fonts.body,
    h1: { ...headingBase, fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.95 },
    h2: { ...headingBase, fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' },
    h3: { ...headingBase, fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', letterSpacing: '0.02em' },
    h4: { ...headingBase, fontSize: '1.25rem', letterSpacing: '0.03em' },
    subtitle1: { fontSize: '1.125rem', lineHeight: 1.6 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
    overline: {
      fontFamily: fonts.heading,
      fontWeight: 600,
      fontSize: '0.95rem',
      letterSpacing: '0.2em',
      lineHeight: 1.4,
    },
    button: { fontFamily: fonts.heading, fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.08em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { backgroundColor: brand.white },
        img: { maxWidth: '100%', display: 'block' },
        ':focus-visible': { outline: `3px solid ${brand.yellow}`, outlineOffset: 2 },
        '@media (prefers-reduced-motion: reduce)': {
          html: { scrollBehavior: 'auto' },
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            transitionDuration: '0.01ms !important',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { padding: '10px 26px', minHeight: 46 },
        sizeLarge: { padding: '13px 34px', fontSize: '1.15rem', minHeight: 54 },
      },
    },
    MuiContainer: { defaultProps: { maxWidth: 'lg' } },
    MuiTextField: { defaultProps: { fullWidth: true, variant: 'outlined' } },
    MuiCard: { styleOverrides: { root: { boxShadow: 'none', border: `1px solid ${brand.line}` } } },
  },
});
