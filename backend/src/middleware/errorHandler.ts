import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, 'NOT_FOUND', 'Resource not found.'));
}

interface HttpLikeError {
  status?: number;
  statusCode?: number;
  type?: string;
}

/**
 * Central error handler. Known AppErrors are returned as-is; everything else
 * (including SQL errors) is logged server-side and replaced by a generic
 * message so internals are never exposed to clients.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, ...(err.details && { details: err.details }) },
    });
    return;
  }

  // Errors raised by express.json(): malformed JSON or payload too large.
  const httpError = err as HttpLikeError;
  const status = httpError.status ?? httpError.statusCode;
  if (httpError.type === 'entity.parse.failed') {
    res.status(400).json({ error: { code: 'INVALID_JSON', message: 'Request body is not valid JSON.' } });
    return;
  }
  if (status === 413) {
    res.status(413).json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'Request body is too large.' } });
    return;
  }

  logger.error('Unhandled error', err);
  res
    .status(500)
    .json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again later.' } });
}
