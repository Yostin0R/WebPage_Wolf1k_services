import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { CONTACT_NAV_ITEM, NAV_ITEMS } from '../../config/routes';
import { brand, fonts } from '../../theme/tokens';
import { Logo } from '../common/Logo';

interface MobileDrawerProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ id, open, onClose }: MobileDrawerProps) {
  return (
    <Drawer
      id={id}
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 'min(88vw, 340px)', bgcolor: brand.black, color: brand.white } } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box onClick={onClose}>
          <Logo inverted height={40} />
        </Box>
        <IconButton aria-label="Close menu" onClick={onClose} sx={{ color: brand.white }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="nav" aria-label="Mobile" sx={{ display: 'flex', flexDirection: 'column', px: 2, pb: 3 }}>
        {[...NAV_ITEMS, CONTACT_NAV_ITEM].map((item) => (
          <Box
            key={item.to}
            component={NavLink}
            to={item.to}
            end
            onClick={onClose}
            sx={{
              py: 1.75,
              pl: 2,
              borderLeft: '4px solid transparent',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              fontFamily: fonts.heading,
              fontWeight: 600,
              fontSize: '1.35rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: brand.white,
              '&.active': { borderLeftColor: brand.red, color: brand.yellow },
            }}
          >
            {item.label}
          </Box>
        ))}
        <Button component={RouterLink} to={CONTACT_NAV_ITEM.to} onClick={onClose} variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
          Let&apos;s Talk
        </Button>
      </Box>
    </Drawer>
  );
}
