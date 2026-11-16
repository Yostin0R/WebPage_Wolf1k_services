import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { highlights } from '../../data/home';
import { brand } from '../../theme/tokens';

/** Trust strip directly under the hero. */
export function Highlights() {
  return (
    <Box component="section" aria-label="Company highlights" sx={{ bgcolor: brand.charcoal, color: brand.white, py: { xs: 5, md: 6 } }}>
      <Container>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: { xs: 4, md: 5 }, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' } }}>
          {highlights.map((item) => (
            <li key={item.id}>
              <Box aria-hidden sx={{ width: 28, height: 3, bgcolor: brand.yellow, mb: 1.5 }} />
              <Typography variant="h4" component="h2">
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.75, color: 'rgba(255,255,255,0.72)' }}>
                {item.text}
              </Typography>
            </li>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
