import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchReviews, submitReview } from '../../api/reviews';
import { MESSAGES } from '../../config/messages';
import { renderWithProviders } from '../../test/renderWithProviders';
import type { Review } from '../../types';
import { ReviewForm } from './ReviewForm';
import { ReviewsSection } from './ReviewsSection';

vi.mock('../../api/reviews');
const fetchMock = vi.mocked(fetchReviews);
const submitMock = vi.mocked(submitReview);

const sampleReviews: Review[] = [
  { id: 1, name: 'Maria G.', rating: 5, comment: 'The crown molding looks amazing.', createdAt: '2026-03-10T12:00:00.000Z' },
  { id: 2, name: 'David R.', rating: 4, comment: 'Clean work and on schedule.' },
];

describe('ReviewsSection', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('renders reviews returned by the API', async () => {
    fetchMock.mockResolvedValue(sampleReviews);
    renderWithProviders(<ReviewsSection />);

    expect(screen.getByRole('heading', { name: /what our customers say/i })).toBeInTheDocument();
    expect(await screen.findByText('The crown molding looks amazing.')).toBeInTheDocument();
    expect(screen.getByText('Maria G.')).toBeInTheDocument();
    expect(screen.getByText('March 2026')).toBeInTheDocument();
    expect(screen.getByLabelText('Rated 5 out of 5 stars')).toBeInTheDocument();
    expect(screen.getByLabelText('Rated 4 out of 5 stars')).toBeInTheDocument();
  });

  it('shows an empty state when there are no approved reviews', async () => {
    fetchMock.mockResolvedValue([]);
    renderWithProviders(<ReviewsSection />);
    expect(await screen.findByText(MESSAGES.reviews.empty)).toBeInTheDocument();
  });

  it('shows a friendly message when the API is unavailable', async () => {
    fetchMock.mockRejectedValue(new Error('Network Error'));
    renderWithProviders(<ReviewsSection />);
    expect(await screen.findByText(MESSAGES.reviews.loadError)).toBeInTheDocument();
  });
});

describe('ReviewForm', () => {
  beforeEach(() => {
    submitMock.mockReset();
  });

  it('validates all fields before submitting', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReviewForm />);

    await user.click(screen.getByRole('button', { name: /submit review/i }));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Please select a rating')).toBeInTheDocument();
    expect(screen.getByText('Review is required')).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it('submits a valid review and shows the approval message', async () => {
    submitMock.mockResolvedValue();
    const user = userEvent.setup();
    renderWithProviders(<ReviewForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    fireEvent.click(screen.getByRole('radio', { name: '5 Stars' }));
    await user.type(screen.getByLabelText(/^review/i), 'Great trim work throughout the house.');
    await user.click(screen.getByRole('button', { name: /submit review/i }));

    expect(await screen.findByText(MESSAGES.reviews.success)).toBeInTheDocument();
    expect(submitMock).toHaveBeenCalledWith({ name: 'Jane Doe', rating: 5, comment: 'Great trim work throughout the house.' });
  });

  it('shows an error when submission fails', async () => {
    submitMock.mockRejectedValue(new Error('Network Error'));
    const user = userEvent.setup();
    renderWithProviders(<ReviewForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    fireEvent.click(screen.getByRole('radio', { name: '4 Stars' }));
    await user.type(screen.getByLabelText(/^review/i), 'Great trim work throughout the house.');
    await user.click(screen.getByRole('button', { name: /submit review/i }));

    expect(await screen.findByText(MESSAGES.reviews.error)).toBeInTheDocument();
  });
});
