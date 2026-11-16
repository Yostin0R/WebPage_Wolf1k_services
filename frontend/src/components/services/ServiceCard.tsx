import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Service } from '../../types';
import { brand } from '../../theme/tokens';
import { SmartImage } from '../common/SmartImage';

interface ServiceCardProps {
  service: Service;
  headingLevel: 'h2' | 'h3';
}

export function ServiceCard({ service, headingLevel }: ServiceCardProps) {
  return (
    <Box
      component="article"
      className="zoom-parent"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: brand.white,
        border: `1px solid ${brand.line}`,
        borderBottom: `4px solid ${brand.line}`,
        transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 30px rgba(0,0,0,0.10)', borderBottomColor: brand.red },
      }}
    >
      <SmartImage src={service.image} alt={`${service.title} by WOLF1K Services`} ratio="4 / 3" zoom />
      <Box sx={{ p: 2.5, flexGrow: 1 }}>
        <Typography variant="h3" component={headingLevel} sx={{ fontSize: '1.4rem' }}>
          {service.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {service.description}
        </Typography>
      </Box>
    </Box>
  );
}
