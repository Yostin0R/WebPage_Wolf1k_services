import { ThemeProvider } from '@mui/material/styles';
import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../theme/theme';

export function renderWithProviders(ui: ReactElement, route = '/'): RenderResult {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </ThemeProvider>,
  );
}
