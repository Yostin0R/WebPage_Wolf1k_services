import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { brand } from '../../theme/tokens';
import { ScrollManager } from '../common/ScrollManager';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

const MAIN_ID = 'main-content';

export function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box
        component="a"
        href={`#${MAIN_ID}`}
        sx={{
          position: 'absolute',
          left: 8,
          top: -64,
          zIndex: 2000,
          px: 2,
          py: 1,
          bgcolor: brand.yellow,
          color: brand.black,
          fontWeight: 600,
          '&:focus': { top: 8 },
        }}
      >
        Skip to main content
      </Box>
      <ScrollManager />
      <Navbar />
      <Box component="main" id={MAIN_ID} tabIndex={-1} sx={{ flexGrow: 1, outline: 'none' }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
