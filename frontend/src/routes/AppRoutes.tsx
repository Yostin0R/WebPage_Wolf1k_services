import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { FEATURES } from '../config/features';
import { ROUTES } from '../config/routes';
import HomePage from '../pages/HomePage';

// Secondary pages are code-split so the home page loads fast.
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ReviewsPage = lazy(() => import('../pages/ReviewsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function PageLoader() {
  return (
    <Box sx={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}>
      <CircularProgress aria-label="Loading page" />
    </Box>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.services} element={<ServicesPage />} />
          <Route path={ROUTES.projects} element={<ProjectsPage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          {FEATURES.reviews && <Route path={ROUTES.reviews} element={<ReviewsPage />} />}
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
