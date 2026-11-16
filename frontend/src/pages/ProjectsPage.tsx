import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { ContactCta } from '../components/common/ContactCta';
import { PageHero } from '../components/common/PageHero';
import { Section } from '../components/common/Section';
import { Seo } from '../components/common/Seo';
import { CategoryFilter } from '../components/projects/CategoryFilter';
import { ProjectsGrid } from '../components/projects/ProjectsGrid';
import { WorkVideos } from '../components/projects/WorkVideos';
import { visuallyHidden } from '../theme/tokens';
import { ALL_CATEGORIES, projectCategories, projects } from '../data/projects';

export default function ProjectsPage() {
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);

  const visibleProjects = useMemo(
    () => (category === ALL_CATEGORIES ? projects : projects.filter((project) => project.category === category)),
    [category],
  );

  return (
    <>
      <Seo title="Projects" description="Trim, carpentry and finishing projects completed by WOLF1K Services in the Tampa, Florida area." />
      <PageHero eyebrow="Our work" title="Our Projects" text="Recent trim, carpentry and finishing work." />
      <Section>
        <Typography variant="h2" sx={visuallyHidden}>
          Project gallery
        </Typography>
        <CategoryFilter categories={projectCategories} selected={category} onSelect={setCategory} />
        <ProjectsGrid projects={visibleProjects} />
      </Section>
      <WorkVideos />
      <ContactCta />
    </>
  );
}
