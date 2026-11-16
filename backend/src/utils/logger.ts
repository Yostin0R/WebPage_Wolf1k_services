/* eslint-disable no-console */
// Single place where the API writes to stdout/stderr.
export const logger = {
  info: (message: string): void => console.info(`[info] ${message}`),
  error: (message: string, error?: unknown): void => console.error(`[error] ${message}`, error ?? ''),
};
