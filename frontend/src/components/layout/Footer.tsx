import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { company } from '../../config/company';
import { FOOTER_LINKS } from '../../config/routes';
import { brand, fonts } from '../../theme/tokens';
import { Logo } from '../common/Logo';
import { SocialLinks } from '../common/SocialLinks';

const mutedWhite = 'rgba(255,255,255,0.72)';

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <Typography component="h2" sx={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: brand.yellow, mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: brand.black, color: brand.white, borderTop: `4px solid ${brand.yellow}` }}>
      <Container sx={{ py: { xs: 6, md: 8 }, display: 'grid', gap: { xs: 5, md: 6 }, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' } }}>
        <Box sx={{ gridColumn: { sm: '1 / -1', md: 'auto' } }}>
          <Logo inverted height={52} />
          <Typography sx={{ mt: 2, color: mutedWhite, maxWidth: 320 }}>{company.tagline}</Typography>
        </Box>

        <FooterColumn title="Quick Links">
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1 }}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Box component={RouterLink} to={link.to} sx={{ color: mutedWhite, textDecoration: 'none', display: 'inline-block', py: 0.25, '&:hover': { color: brand.yellow } }}>
                  {link.label}
                </Box>
              </li>
            ))}
          </Box>
        </FooterColumn>

        <FooterColumn title="Service Area">
          <Typography sx={{ color: mutedWhite }}>{company.serviceArea}</Typography>
        </FooterColumn>

        <FooterColumn title="Follow Us">
          <SocialLinks />
        </FooterColumn>
      </Container>

      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.12)', py: 2.5 }}>
        <Container>
          <Typography variant="body2" sx={{ color: mutedWhite }}>
            © {currentYear} {company.shortName}. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
