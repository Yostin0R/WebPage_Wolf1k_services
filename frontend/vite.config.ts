/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true },
  test: {
    environment: 'jsdom',
    // Tests cover the full site; AppRoutes.reviewsOff.test.tsx covers the hidden-reviews mode.
    env: { VITE_ENABLE_REVIEWS: 'true' },
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
