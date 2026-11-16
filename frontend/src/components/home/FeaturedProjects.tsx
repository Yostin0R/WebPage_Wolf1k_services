import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { featuredProjects } from '../../data/projects';
import { brand } from '../../theme/tokens';
import { Section } from '../common/Section';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectsGrid } from '../projects/ProjectsGrid';

const HEADING_ID = 'featured-projects-heading';

export function FeaturedProjects() {
  return (
    <Section tone="dark" labelledBy={HEADING_ID}>
      <SectionHeading id={HEADING_ID} eyebrow="Recent work" title="Featured Projects" text="A look at trim and carpentry we have completed." tone="dark" />
      <ProjectsGrid projects={featuredProjects} tone="dark" />
      <Box sx={{ mt: 5 }}>
        <Button
          component={RouterLink}
          to={ROUTES.projects}
          variant="outlined"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ color: brand.yellow, borderColor: brand.yellow, borderWidth: 2, '&:hover': { borderWidth: 2, borderColor: brand.yellow, bgcolor: brand.yellow, color: brand.black } }}
        >
          View All Projects
        </Button>
      </Box>
    </Section>
  );
}
