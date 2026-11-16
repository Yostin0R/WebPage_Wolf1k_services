import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchReviews } from '../api/reviews';
import { renderWithProviders } from '../test/renderWithProviders';
import { AppRoutes } from './AppRoutes';

vi.mock('../api/reviews');
vi.mock('../config/features', () => ({ FEATURES: { reviews: false } }));

describe('App with reviews disabled', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('hides the reviews section and links and never calls the API', () => {
    renderWithProviders(<AppRoutes />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /what our customers say/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /reviews?/i })).not.toBeInTheDocument();
    expect(fetchReviews).not.toHaveBeenCalled();
  });

  it('answers /reviews with the 404 page', async () => {
    renderWithProviders(<AppRoutes />, '/reviews');
    expect(await screen.findByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });
});
