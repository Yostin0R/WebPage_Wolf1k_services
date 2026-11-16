import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

const STAGGER_MS = 80;

interface RevealProps {
  children: ReactNode;
  /** Position in a list, used to stagger siblings slightly. */
  index?: number;
}

/** Subtle fade + slide-up the first time the content scrolls into view. */
export function Reveal({ children, index = 0 }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <Box
      ref={ref}
      sx={{
        height: '100%',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: 'opacity 500ms ease, transform 500ms ease',
        transitionDelay: `${Math.min(index, 5) * STAGGER_MS}ms`,
        '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'none' },
      }}
    >
      {children}
    </Box>
  );
}
