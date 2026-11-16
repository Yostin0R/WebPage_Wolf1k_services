import type { Request, Response } from 'express';
import { SERVICE_NAME } from '../config/constants.js';

export function getHealth(_req: Request, res: Response): void {
  res.json({ status: 'ok', service: SERVICE_NAME });
}
