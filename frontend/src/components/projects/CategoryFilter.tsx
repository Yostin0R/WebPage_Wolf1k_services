import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { brand, fonts } from '../../theme/tokens';

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <Box role="group" aria-label="Filter projects by category" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 5 }}>
      {categories.map((category) => {
        const active = category === selected;
        return (
          <ButtonBase
            key={category}
            aria-pressed={active}
            onClick={() => onSelect(category)}
            sx={{
              px: 2,
              minHeight: 44,
              fontFamily: fonts.heading,
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: `2px solid ${active ? brand.red : brand.line}`,
              bgcolor: active ? brand.red : brand.white,
              color: active ? brand.white : brand.black,
              transition: 'border-color 150ms ease, background-color 150ms ease',
              '&:hover': { borderColor: brand.red },
            }}
          >
            {category}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
