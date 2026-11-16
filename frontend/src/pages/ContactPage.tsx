import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { SectionHeading } from '../components/common/SectionHeading';
import { Seo } from '../components/common/Seo';
import { ContactInfo } from '../components/contact/ContactInfo';

const HEADING_ID = 'contact-details-heading';

export default function ContactPage() {
  return (
    <>
      <Seo title="Contact Us" description="Phone, email and service area for WOLF1K Services, trim and carpentry in Tampa, Florida." />
      <PageHero eyebrow="Contact WOLF1K" title="Contact Us" text="Let's talk about your next project." />
      <Section tone="muted" labelledBy={HEADING_ID}>
        <SectionHeading id={HEADING_ID} title="Get in touch" text="Reach us directly by phone or email to talk about the work you have in mind." tone="muted" />
        <ContactInfo />
      </Section>
    </>
  );
}
