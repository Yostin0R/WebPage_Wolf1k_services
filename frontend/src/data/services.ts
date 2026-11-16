import type { Service } from '../types';

/**
 * All services offered. To add one: drop an image in
 * frontend/public/assets/services/ and append an object here.
 */
export const services: Service[] = [
  {
    id: 1,
    slug: 'interior-trim',
    title: 'Interior Trim',
    description: 'Casing, wainscoting and wall molding installed with tight joints and clean reveals.',
    image: '/assets/services/interior-trim.webp',
  },
  {
    id: 2,
    slug: 'exterior-trim',
    title: 'Exterior Trim',
    description: 'Column wraps, fascia and exterior details built to stand up to Florida weather.',
    image: '/assets/services/exterior-trim.webp',
  },
  {
    id: 3,
    slug: 'finish-carpentry',
    title: 'Finish Carpentry',
    description: 'The final layer that makes a home feel complete: coffered ceilings, beams and built-in details.',
    image: '/assets/services/finish-carpentry.webp',
  },
  {
    id: 4,
    slug: 'door-installation',
    title: 'Door Installation',
    description: 'Interior, closet, bifold and barn doors hung plumb, level and swinging smoothly.',
    image: '/assets/services/door-installation.webp',
  },
  {
    id: 5,
    slug: 'baseboards',
    title: 'Baseboards',
    description: 'Crisp baseboard runs with scribed fits and seamless inside and outside corners.',
    image: '/assets/services/baseboards.webp',
  },
  {
    id: 6,
    slug: 'crown-molding',
    title: 'Crown Molding',
    description: 'Crown and tray-ceiling molding that frames a room and adds lasting character.',
    image: '/assets/services/crown-molding.webp',
  },
  {
    id: 7,
    slug: 'custom-woodwork',
    title: 'Custom Woodwork',
    description: 'Accent walls, floating shelves and one-of-a-kind pieces made to fit your space.',
    image: '/assets/services/custom-woodwork.webp',
  },
  {
    id: 8,
    slug: 'residential-remodeling',
    title: 'Residential Remodeling',
    description: 'Trim and carpentry packages for remodels and new residential construction.',
    image: '/assets/services/residential-remodeling.webp',
  },
];
