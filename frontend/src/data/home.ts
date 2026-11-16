/** Content for the home page that is not a service or a project. */
export const heroContent = {
  titleTop: 'Top Quality',
  titleAccent: 'Trim & Carpentry',
  titleBottom: 'For Your Home',
  subtitle:
    'Proudly serving Tampa, Florida with custom finish carpentry designed to upgrade and transform your space.',
  image: '/assets/hero/hero-01.webp',
  imageAlt: 'Living room with crown molding around a tray ceiling, finished by WOLF1K Services',
  primaryCta: 'Contact Us',
  secondaryCta: 'View Our Work',
} as const;

export type HeroFeatureIcon = 'baseboards' | 'panels' | 'crown' | 'custom' | 'doors' | 'residential';

export interface HeroFeature {
  id: number;
  icon: HeroFeatureIcon;
  title: string;
  text: string;
}

/** Short service list shown inside the hero. */
export const heroFeatures: HeroFeature[] = [
  { id: 1, icon: 'baseboards', title: 'Baseboards', text: 'Installation & replacement' },
  { id: 2, icon: 'panels', title: 'Wall Panels', text: 'Accent walls & wainscoting' },
  { id: 3, icon: 'crown', title: 'Crown Molding', text: 'Elegant & modern finishes' },
  { id: 4, icon: 'custom', title: 'Custom Carpentry', text: 'Built to your style' },
  { id: 5, icon: 'doors', title: 'Doors & Casings', text: 'Interior & exterior' },
  { id: 6, icon: 'residential', title: 'Residential Projects', text: 'New construction & remodels' },
];

export interface Highlight {
  id: number;
  title: string;
  text: string;
}

export const highlights: Highlight[] = [
  { id: 1, title: 'Tampa Based', text: 'Local crew serving homes across the Tampa area.' },
  { id: 2, title: 'Residential Focus', text: 'New builds, remodels and single-room upgrades.' },
  { id: 3, title: 'Trim to Finish', text: 'From baseboards and doors to coffered ceilings.' },
  { id: 4, title: 'Detail Driven', text: 'Tight miters, clean caulk lines, level reveals.' },
];

export interface Reason {
  id: number;
  title: string;
  text: string;
}

export const reasons: Reason[] = [
  {
    id: 1,
    title: 'Precision in every cut',
    text: 'We measure twice and fit by hand, so joints close tight and lines stay straight.',
  },
  {
    id: 2,
    title: 'Clean, respectful job sites',
    text: 'We protect your floors, keep our work area organized and clean up when we finish.',
  },
  {
    id: 3,
    title: 'Clear communication',
    text: 'You know what we are doing, when we will be there and what comes next.',
  },
  {
    id: 4,
    title: 'Finishes that last',
    text: 'Proper fastening, quality materials and careful prep mean results that hold up.',
  },
];

export const whyChooseUsImage = {
  src: '/assets/hero/team-01.webp',
  alt: 'WOLF1K Services carpenter cutting trim on a miter saw',
} as const;
