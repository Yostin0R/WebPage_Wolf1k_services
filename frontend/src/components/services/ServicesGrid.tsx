import Box from '@mui/material/Box';
import { services } from '../../data/services';
import { Reveal } from '../common/Reveal';
import { ServiceCard } from './ServiceCard';

interface ServicesGridProps {
  /** Heading level for card titles, so each page keeps a correct outline. */
  headingLevel: 'h2' | 'h3';
}

export function ServicesGrid({ headingLevel }: ServicesGridProps) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
      {services.map((service, index) => (
        <li key={service.id}>
          <Reveal index={index % 4}>
            <ServiceCard service={service} headingLevel={headingLevel} />
          </Reveal>
        </li>
      ))}
    </Box>
  );
}
