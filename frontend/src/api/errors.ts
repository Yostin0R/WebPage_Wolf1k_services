import { isAxiosError } from 'axios';

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: { field: string; message: string }[];
  };
}

export interface ParsedApiError {
  status?: number;
  isRateLimited: boolean;
  /** Field-level messages returned by the API validation, keyed by field name. */
  fieldErrors: Record<string, string>;
}

const HTTP_TOO_MANY_REQUESTS = 429;

/** Converts any thrown value into a predictable shape for the UI. */
export function parseApiError(error: unknown): ParsedApiError {
  if (!isAxiosError<ApiErrorBody>(error)) {
    return { isRateLimited: false, fieldErrors: {} };
  }
  const status = error.response?.status;
  const details = error.response?.data?.error?.details ?? [];
  return {
    status,
    isRateLimited: status === HTTP_TOO_MANY_REQUESTS,
    fieldErrors: Object.fromEntries(details.map((detail) => [detail.field, detail.message])),
  };
}
