import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { reasons, whyChooseUsImage } from '../../data/home';
import { brand } from '../../theme/tokens';
import { Reveal } from '../common/Reveal';
import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';
import { SmartImage } from '../common/SmartImage';

const HEADING_ID = 'why-heading';

export function WhyChooseUs() {
  return (
    <Section tone="muted" labelledBy={HEADING_ID}>
      <Box sx={{ display: 'grid', gap: { xs: 5, md: 8 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' } }}>
        {/* Offset red block behind the photo, like a mitered trim corner. */}
        <Box sx={{ position: 'relative', pr: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 }, maxWidth: { xs: 420, md: 'none' } }}>
          <Box aria-hidden sx={{ position: 'absolute', right: 0, bottom: 0, width: '55%', height: '55%', bgcolor: brand.red }} />
          <SmartImage src={whyChooseUsImage.src} alt={whyChooseUsImage.alt} ratio="4 / 5" sx={{ position: 'relative' }} />
        </Box>

        <Box>
          <SectionHeading id={HEADING_ID} eyebrow="Why choose us" title="Built on the details" tone="muted" />
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3 }}>
            {reasons.map((reason, index) => (
              <li key={reason.id}>
                <Reveal index={index}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box aria-hidden sx={{ flexShrink: 0, width: 36, height: 36, bgcolor: brand.red, color: brand.white, display: 'grid', placeItems: 'center' }}>
                      <CheckIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="h4" component="h3">
                        {reason.title}
                      </Typography>
                      <Typography sx={{ mt: 0.5, color: 'text.secondary' }}>{reason.text}</Typography>
                    </Box>
                  </Box>
                </Reveal>
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
