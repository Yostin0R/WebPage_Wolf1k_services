import { FEATURES } from './features';

export const ROUTES = {
  home: '/',
  services: '/services',
  projects: '/projects',
  about: '/about',
  reviews: '/reviews',
  contact: '/contact',
} as const;

/** Anchor of the "write a review" form on the Reviews page. */
export const REVIEW_FORM_ANCHOR = 'write-a-review';

export interface NavItem {
  label: string;
  to: string;
}

/** Main navigation. Contact is rendered separately as the highlighted CTA. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Services', to: ROUTES.services },
  { label: 'Projects', to: ROUTES.projects },
  { label: 'About Us', to: ROUTES.about },
  ...(FEATURES.reviews ? [{ label: 'Reviews', to: ROUTES.reviews }] : []),
];

export const CONTACT_NAV_ITEM: NavItem = { label: 'Contact Us', to: ROUTES.contact };

export const FOOTER_LINKS: NavItem[] = [
  { label: 'Home', to: ROUTES.home },
  { label: 'Services', to: ROUTES.services },
  { label: 'Projects', to: ROUTES.projects },
  { label: 'About', to: ROUTES.about },
  ...(FEATURES.reviews ? [{ label: 'Reviews', to: ROUTES.reviews }] : []),
  { label: 'Contact', to: ROUTES.contact },
];
