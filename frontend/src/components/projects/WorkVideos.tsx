import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { workVideos } from '../../data/videos';
import { brand } from '../../theme/tokens';
import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';

const HEADING_ID = 'videos-heading';

/** Job-site clips. Videos only download when the visitor presses play. */
export function WorkVideos() {
  if (workVideos.length === 0) return null;

  return (
    <Section tone="dark" labelledBy={HEADING_ID}>
      <SectionHeading id={HEADING_ID} eyebrow="On the job" title="See the work up close" tone="dark" />
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, maxWidth: { xs: 360, sm: 'none' } }}>
        {workVideos.map((video) => (
          <li key={video.id}>
            <Box
              component="video"
              controls
              playsInline
              preload="none"
              poster={video.poster}
              aria-label={video.title}
              sx={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', bgcolor: brand.charcoal, display: 'block', borderBottom: `4px solid ${brand.red}` }}
            >
              <source src={video.src} type="video/mp4" />
            </Box>
            <Typography variant="body2" sx={{ mt: 1.5, color: 'rgba(255,255,255,0.78)' }}>
              {video.title}
            </Typography>
          </li>
        ))}
      </Box>
    </Section>
  );
}
