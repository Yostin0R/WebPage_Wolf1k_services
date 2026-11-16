import { ContactCta } from '../components/common/ContactCta';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { ServicesGrid } from '../components/services/ServicesGrid';

export default function ServicesPage() {
  return (
    <>
      <Seo title="Services" description="Interior and exterior trim, finish carpentry, doors, baseboards, crown molding and custom woodwork in Tampa, Florida." />
      <PageHero eyebrow="What we do" title="Our Services" text="Trim, carpentry and finishing for residential projects in Tampa, Florida." />
      <Section>
        <ServicesGrid headingLevel="h2" />
      </Section>
      <ContactCta />
    </>
  );
}
