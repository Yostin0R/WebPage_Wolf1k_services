import axios from 'axios';

/**
 * Shared Axios instance. The base URL comes from VITE_API_URL; when it is not
 * set the app falls back to a same-origin path (useful behind a reverse proxy).
 */
const SAME_ORIGIN_API = '/api/v1';
const REQUEST_TIMEOUT_MS = 10_000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || SAME_ORIGIN_API,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});
