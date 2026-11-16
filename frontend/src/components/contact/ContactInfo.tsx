import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { company } from '../../config/company';
import { brand } from '../../theme/tokens';
import { SocialLinks } from '../common/SocialLinks';

interface ContactMethod {
  id: string;
  label: string;
  value: string;
  icon: ReactNode;
  action?: { label: string; href: string };
}

/**
 * Company contact details from src/config/company.ts. The site has no contact
 * form and stores no visitor data: people call or email the company directly.
 * Empty phone/email are hidden.
 */
export function ContactInfo() {
  const methods: ContactMethod[] = [];

  if (company.phone) {
    methods.push({
      id: 'phone',
      label: 'Phone',
      value: company.phone,
      icon: <PhoneOutlinedIcon fontSize="large" />,
      action: { label: 'Call Us', href: `tel:${company.phone.replace(/[^0-9+]/g, '')}` },
    });
  }
  if (company.email) {
    methods.push({
      id: 'email',
      label: 'Email',
      value: company.email,
      icon: <EmailOutlinedIcon fontSize="large" />,
      action: { label: 'Email Us', href: `mailto:${company.email}` },
    });
  }
  methods.push({ id: 'area', label: 'Service Area', value: company.serviceArea, icon: <PlaceOutlinedIcon fontSize="large" /> });

  const hasDirectContact = Boolean(company.phone || company.email);
  const hasSocial = Boolean(company.social.facebook || company.social.instagram);

  return (
    <Box>
      {!hasDirectContact && (
        <>
          <Typography sx={{ mb: 3, color: 'text.secondary' }}>Our phone and email will be listed here soon.</Typography>
          {import.meta.env.DEV && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Developer note: add the company phone and/or email in src/config/company.ts.
            </Alert>
          )}
        </>
      )}

      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: `repeat(${methods.length}, 1fr)` } }}>
        {methods.map((method) => (
          <Box
            component="li"
            key={method.id}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: { xs: 3, md: 4 }, bgcolor: brand.white, border: `1px solid ${brand.line}`, borderTop: `5px solid ${brand.red}` }}
          >
            <Box aria-hidden sx={{ color: brand.red, mb: 1.5 }}>
              {method.icon}
            </Box>
            <Typography variant="overline" component="h3" sx={{ color: 'text.secondary' }}>
              {method.label}
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: { xs: '1.25rem', md: '1.4rem' }, fontWeight: 600, overflowWrap: 'anywhere', flexGrow: 1 }}>
              {method.value}
            </Typography>
            {method.action && (
              <Button component="a" href={method.action.href} variant="contained" color="primary" sx={{ mt: 2.5 }}>
                {method.action.label}
              </Button>
            )}
          </Box>
        ))}
      </Box>

      {hasSocial && (
        <Box sx={{ mt: 4, p: { xs: 3, md: 4 }, bgcolor: brand.black, color: brand.white, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="h4" component="h3">
            Follow our work
          </Typography>
          <SocialLinks />
        </Box>
      )}
    </Box>
  );
}
