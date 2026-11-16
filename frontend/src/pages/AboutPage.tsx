import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ContactCta } from '../components/common/ContactCta';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { SectionHeading } from '../components/common/SectionHeading';
import { Seo } from '../components/common/Seo';
import { SmartImage } from '../components/common/SmartImage';
import { aboutContent } from '../data/about';
import { brand } from '../theme/tokens';

const STORY_ID = 'about-story-heading';
const VALUES_ID = 'about-values-heading';

export default function AboutPage() {
  return (
    <>
      <Seo title="About Us" description="WOLF1K Services is a trim and finish carpentry crew based in Tampa, Florida." />
      <PageHero eyebrow="Who we are" title="About Us" text="A Tampa crew focused on trim, carpentry and clean finishes." />

      <Section labelledBy={STORY_ID}>
        <Box sx={{ display: 'grid', gap: { xs: 5, md: 8 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Box>
            <SectionHeading id={STORY_ID} eyebrow="Our craft" title="Carpentry done the right way" />
            <Typography variant="subtitle1">{aboutContent.intro}</Typography>
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>{aboutContent.body}</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {aboutContent.images.map((image, index) => (
              <SmartImage key={image.src} src={image.src} alt={image.alt} ratio="3 / 4" sx={{ mt: index === 1 ? { xs: 3, md: 5 } : 0, borderBottom: `5px solid ${index === 0 ? brand.red : brand.yellow}` }} />
            ))}
          </Box>
        </Box>
      </Section>

      <Section tone="muted" labelledBy={VALUES_ID}>
        <SectionHeading id={VALUES_ID} eyebrow="How we work" title="What you can expect" tone="muted" />
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {aboutContent.values.map((value) => (
            <Box component="li" key={value.id} sx={{ bgcolor: brand.white, p: 3.5, borderLeft: `5px solid ${brand.red}` }}>
              <Typography variant="h3">{value.title}</Typography>
              <Typography sx={{ mt: 1, color: 'text.secondary' }}>{value.text}</Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <ContactCta />
    </>
  );
}
