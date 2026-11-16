import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { AppError } from '../utils/AppError.js';

/**
 * Validates and sanitises req.body with a Zod schema. On success the body is
 * replaced by the parsed output, so controllers never see raw client data.
 */
export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.code === 'unrecognized_keys' ? 'Unexpected field(s) in request' : issue.message,
      }));
      next(new AppError(400, 'VALIDATION_ERROR', 'Please review the highlighted fields.', details));
      return;
    }
    req.body = result.data;
    next();
  };
}
