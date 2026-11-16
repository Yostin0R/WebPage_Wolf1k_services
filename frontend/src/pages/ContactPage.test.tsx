import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { company } from '../config/company';
import { renderWithProviders } from '../test/renderWithProviders';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('shows the company contact details', () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByRole('heading', { level: 1, name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByText('Service Area')).toBeInTheDocument();
    expect(screen.getByText(company.serviceArea)).toBeInTheDocument();
    if (company.phone) expect(screen.getByRole('link', { name: /call us/i })).toHaveAttribute('href', expect.stringMatching(/^tel:/));
    if (company.email) expect(screen.getByRole('link', { name: /email us/i })).toHaveAttribute('href', `mailto:${company.email}`);
  });

  it('has no form and collects no visitor data', () => {
    renderWithProviders(<ContactPage />);

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /send/i })).not.toBeInTheDocument();
  });
});
