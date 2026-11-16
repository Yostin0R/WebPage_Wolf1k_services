import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchReviews } from '../api/reviews';
import { renderWithProviders } from '../test/renderWithProviders';
import { AppRoutes } from './AppRoutes';

vi.mock('../api/reviews');

describe('App navigation', () => {
  beforeEach(() => {
    vi.mocked(fetchReviews).mockResolvedValue([]);
    window.scrollTo = vi.fn();
  });

  it('renders the home page with its critical sections and a single H1', async () => {
    renderWithProviders(<AppRoutes />);

    expect(screen.getByRole('heading', { level: 1, name: /top quality trim & carpentry for your home/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const name of [/our services/i, /built on the details/i, /featured projects/i, /what our customers say/i]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByRole('contentinfo')).toHaveTextContent(`© ${new Date().getFullYear()} WOLF1K Services. All rights reserved.`);
  });

  it('exposes the expected navigation and no "Estimate" entry anywhere', () => {
    renderWithProviders(<AppRoutes />);
    const nav = screen.getByRole('navigation', { name: 'Main' });

    for (const name of ['Home', 'Services', 'Projects', 'About Us', 'Reviews', 'Contact Us']) {
      expect(within(nav).getByRole('link', { name })).toBeInTheDocument();
    }
    expect(screen.queryByText(/estimate/i)).not.toBeInTheDocument();
  });

  it.each([
    ['Services', /our services/i],
    ['Projects', /our projects/i],
    ['About Us', /about us/i],
    ['Reviews', /what our customers say/i],
    ['Contact Us', /contact us/i],
  ])('navigates to %s', async (linkName, heading) => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />);

    await user.click(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: linkName }));

    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it('opens the mobile drawer menu', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />);

    // The toggle is hidden by CSS at the default (desktop) jsdom width.
    await user.click(screen.getByLabelText('Open menu'));

    const mobileNav = await screen.findByRole('navigation', { name: 'Mobile' });
    expect(within(mobileNav).getByRole('link', { name: 'Projects' })).toBeInTheDocument();
  });

  it('shows a 404 page for unknown routes, including the removed /estimates', async () => {
    renderWithProviders(<AppRoutes />, '/estimates');
    expect(await screen.findByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });
});
