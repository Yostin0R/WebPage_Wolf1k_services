import Box from '@mui/material/Box';
import type { Project } from '../../types';
import { Reveal } from '../common/Reveal';
import type { SectionTone } from '../common/Section';
import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  tone?: SectionTone;
}

export function ProjectsGrid({ projects, tone = 'light' }: ProjectsGridProps) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', columnGap: 3, rowGap: 5, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' } }}>
      {projects.map((project, index) => (
        <li key={project.id}>
          <Reveal index={index % 3}>
            <ProjectCard project={project} tone={tone} />
          </Reveal>
        </li>
      ))}
    </Box>
  );
}
