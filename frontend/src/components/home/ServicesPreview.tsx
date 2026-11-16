import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';
import { ServicesGrid } from '../services/ServicesGrid';

const HEADING_ID = 'services-heading';

export function ServicesPreview() {
  return (
    <Section labelledBy={HEADING_ID}>
      <SectionHeading
        id={HEADING_ID}
        eyebrow="What we do"
        title="Our Services"
        text="Trim, carpentry and finishing for residential projects, from a single room to a full home."
      />
      <ServicesGrid headingLevel="h3" />
    </Section>
  );
}
