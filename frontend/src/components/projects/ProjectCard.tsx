import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Project } from '../../types';
import { brand } from '../../theme/tokens';
import type { SectionTone } from '../common/Section';
import { SmartImage } from '../common/SmartImage';

interface ProjectCardProps {
  project: Project;
  tone?: SectionTone;
}

export function ProjectCard({ project, tone = 'light' }: ProjectCardProps) {
  const isDark = tone === 'dark';
  const mutedColor = isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary';

  return (
    <Box component="article" className="zoom-parent" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <SmartImage src={project.image} alt={`${project.title}${project.location ? ` in ${project.location}` : ''}`} ratio="4 / 5" zoom />
        <Typography
          component="span"
          variant="overline"
          sx={{ position: 'absolute', left: 0, bottom: 0, px: 1.5, py: 0.5, fontSize: '0.8rem', bgcolor: brand.red, color: brand.white }}
        >
          {project.category}
        </Typography>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography variant="h3" sx={{ fontSize: '1.4rem' }}>
          {project.title}
        </Typography>
        {project.location && (
          <Typography variant="body2" sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5, color: mutedColor }}>
            <PlaceOutlinedIcon sx={{ fontSize: 18, color: brand.yellow }} aria-hidden />
            {project.location}
          </Typography>
        )}
        <Typography variant="body2" sx={{ mt: 1, color: mutedColor }}>
          {project.description}
        </Typography>
      </Box>
    </Box>
  );
}
