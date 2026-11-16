import { rateLimit, type RateLimitRequestHandler } from 'express-rate-limit';

export interface RateLimitOptions {
  windowMs: number;
  max: number;
}

function buildLimiter({ windowMs, max }: RateLimitOptions, message: string): RateLimitRequestHandler {
  return rateLimit({
    windowMs,
    limit: max,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: { code: 'RATE_LIMITED', message } },
  });
}

/** Applied to the whole API. */
export const createGeneralLimiter = (options: RateLimitOptions): RateLimitRequestHandler =>
  buildLimiter(options, 'Too many requests. Please try again later.');

/** Strict limiter for public form submissions (basic spam protection). */
export const createFormLimiter = (options: RateLimitOptions): RateLimitRequestHandler =>
  buildLimiter(options, 'Too many submissions. Please try again later.');
