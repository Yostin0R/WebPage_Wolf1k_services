import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import PlaceIcon from '@mui/icons-material/Place';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useState } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { company } from '../../config/company';
import { CONTACT_NAV_ITEM, NAV_ITEMS } from '../../config/routes';
import { brand, fonts, layout } from '../../theme/tokens';
import { Logo } from '../common/Logo';
import { SocialLinks } from '../common/SocialLinks';
import { MobileDrawer } from './MobileDrawer';

const DRAWER_ID = 'mobile-navigation';

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  return (
    <>
      <Box sx={{ bgcolor: brand.black, color: brand.white, py: 0.5 }}>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, minHeight: 32 }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.85rem', letterSpacing: '0.04em' }}>
            <PlaceIcon sx={{ fontSize: 18, color: brand.yellow }} aria-hidden />
            {company.serviceArea}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: fonts.heading, fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              {company.slogan}
            </Typography>
            <SocialLinks variant="plain" />
          </Box>
        </Container>
      </Box>

      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: brand.white,
          borderBottom: `1px solid ${brand.line}`,
          boxShadow: scrolled ? '0 6px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'box-shadow 200ms ease',
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ minHeight: layout.navHeight, justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, minWidth: 0 }}>
              <Logo />
              {company.credentials && (
                <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1.25, pl: 2.5, borderLeft: `1px solid ${brand.line}` }}>
                  <VerifiedUserIcon sx={{ fontSize: 34, color: brand.red }} aria-hidden />
                  <Box sx={{ lineHeight: 1.1 }}>
                    <Typography sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '1.15rem', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.1 }}>
                      {company.credentials}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'text.secondary' }}>
                      {company.credentialsDetail}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <Box component="nav" aria-label="Main" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 2.5, lg: 3.5 } }}>
              {NAV_ITEMS.map((item) => (
                <Box
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  end
                  sx={{
                    position: 'relative',
                    py: 1,
                    fontFamily: fonts.heading,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: brand.black,
                    transition: 'color 150ms ease',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      height: 3,
                      bgcolor: brand.red,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 200ms ease',
                    },
                    '&:hover, &.active': { color: brand.red },
                    '&:hover::after, &.active::after': { transform: 'scaleX(1)' },
                  }}
                >
                  {item.label}
                </Box>
              ))}
              <Button component={RouterLink} to={CONTACT_NAV_ITEM.to} variant="contained" color="primary" endIcon={<ChevronRightIcon />}>
                {CONTACT_NAV_ITEM.label}
              </Button>
            </Box>

            <IconButton
              aria-label="Open menu"
              aria-controls={DRAWER_ID}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { md: 'none' }, color: brand.black }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileDrawer id={DRAWER_ID} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
