import type { Project } from '../types';

/**
 * Project gallery. To add one: copy the photo to
 * frontend/public/assets/projects/ and append an object here.
 * `location` is optional. Set `featured: true` to show it on the home page.
 */
export const projects: Project[] = [
  {
    id: 1,
    title: 'Coffered Ceiling',
    category: 'Ceilings',
    location: 'Tampa, FL',
    description: 'Painted coffered ceiling grid with crisp beams over a bright living room.',
    image: '/assets/projects/project-01.webp',
    featured: true,
  },
  {
    id: 2,
    title: 'Dining Room Wainscoting & Crown',
    category: 'Interior Trim',
    location: 'Tampa, FL',
    description: 'Picture-frame wainscoting paired with crown molding for a formal dining room.',
    image: '/assets/projects/project-02.webp',
    featured: true,
  },
  {
    id: 3,
    title: 'Tray Ceiling Crown Molding',
    category: 'Ceilings',
    location: 'Tampa, FL',
    description: 'Crown molding wrapped around an octagonal tray ceiling.',
    image: '/assets/projects/project-03.webp',
    featured: true,
  },
  {
    id: 4,
    title: 'Open-Concept Trim Package',
    category: 'Interior Trim',
    location: 'Tampa, FL',
    description: 'Baseboards, casing and tray-ceiling crown throughout a kitchen and great room.',
    image: '/assets/projects/project-04.webp',
    featured: true,
  },
  {
    id: 5,
    title: 'Wood Accent Vanity Wall',
    category: 'Custom Woodwork',
    location: 'Tampa, FL',
    description: 'Warm wood accent wall behind a double vanity.',
    image: '/assets/projects/project-05.webp',
    featured: true,
  },
  {
    id: 6,
    title: 'Double Barn Doors',
    category: 'Doors',
    location: 'Tampa, FL',
    description: 'Sliding double barn doors on black hardware.',
    image: '/assets/projects/project-06.webp',
    featured: true,
  },
  {
    id: 7,
    title: 'Porch Column Wraps',
    category: 'Exterior Trim',
    location: 'Tampa, FL',
    description: 'Tapered craftsman column wraps with clean, square lines.',
    image: '/assets/projects/project-07.webp',
  },
  {
    id: 8,
    title: 'Window Casing',
    category: 'Interior Trim',
    location: 'Tampa, FL',
    description: 'Full window casing with sill and apron.',
    image: '/assets/projects/project-08.webp',
  },
  {
    id: 9,
    title: 'Interior Door Installation',
    category: 'Doors',
    location: 'Tampa, FL',
    description: 'Two-panel interior doors hung and cased throughout the home.',
    image: '/assets/projects/project-09.webp',
  },
  {
    id: 10,
    title: 'Picture-Frame Wall Molding',
    category: 'Interior Trim',
    location: 'Tampa, FL',
    description: 'Chair rail and picture-frame molding with tight mitered corners.',
    image: '/assets/projects/project-10.webp',
  },
  {
    id: 11,
    title: 'Front Porch Exterior Trim',
    category: 'Exterior Trim',
    location: 'Tampa, FL',
    description: 'Column wraps, gable details and exterior trim on a new home.',
    image: '/assets/projects/project-11.webp',
  },
  {
    id: 12,
    title: 'Floating Bathroom Shelves',
    category: 'Custom Woodwork',
    location: 'Tampa, FL',
    description: 'Solid wood floating shelves fitted into a bathroom alcove.',
    image: '/assets/projects/project-12.webp',
  },
  {
    id: 13,
    title: 'Sliding Closet Doors',
    category: 'Doors',
    location: 'Tampa, FL',
    description: 'Bypass closet doors with matching casing and baseboards.',
    image: '/assets/projects/project-13.webp',
  },
  {
    id: 14,
    title: 'Bifold Closet Doors',
    category: 'Doors',
    location: 'Tampa, FL',
    description: 'Bifold closet doors aligned and trimmed for a smooth fold.',
    image: '/assets/projects/project-14.webp',
  },
  {
    id: 15,
    title: 'Whole-Home Finish Carpentry',
    category: 'Interior Trim',
    location: 'Tampa, FL',
    description: 'Final trim-out in progress on a new residential build.',
    image: '/assets/projects/project-15.webp',
  },
];

export const ALL_CATEGORIES = 'All';

export const projectCategories: string[] = [
  ALL_CATEGORIES,
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export const featuredProjects: Project[] = projects.filter((project) => project.featured);
