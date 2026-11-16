import { ContactCta } from '../components/common/ContactCta';
import { Seo } from '../components/common/Seo';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { Hero } from '../components/home/Hero';
import { Highlights } from '../components/home/Highlights';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { FEATURES } from '../config/features';
import { ReviewsSection } from '../components/reviews/ReviewsSection';

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <Highlights />
      <ServicesPreview />
      <WhyChooseUs />
      <FeaturedProjects />
      {FEATURES.reviews && <ReviewsSection />}
      <ContactCta />
    </>
  );
}
