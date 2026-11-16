import type { WorkVideo } from '../types';

/** Short job-site clips (files live in frontend/public/assets/videos/). */
export const workVideos: WorkVideo[] = [
  {
    id: 1,
    title: 'Great room and kitchen trim walkthrough',
    src: '/assets/videos/work-01.mp4',
    poster: '/assets/videos/work-01.webp',
  },
  {
    id: 2,
    title: 'Staircase railing and interior doors',
    src: '/assets/videos/work-02.mp4',
    poster: '/assets/videos/work-02.webp',
  },
  {
    id: 3,
    title: 'Front porch railing',
    src: '/assets/videos/work-03.mp4',
    poster: '/assets/videos/work-03.webp',
  },
];
