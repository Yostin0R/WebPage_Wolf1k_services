import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),

  DB_HOST: z.string().min(1).default('localhost'),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_USER: z.string().min(1).default('wolf1k'),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string().min(1).default('wolf1k'),
  DB_CONNECTION_LIMIT: z.coerce.number().int().positive().default(10),

  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().positive().default(15),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(300),
  FORM_RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().positive().default(60),
  FORM_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
  throw new Error(`Invalid environment configuration - ${details}`);
}

const raw = parsed.data;

export const env = {
  nodeEnv: raw.NODE_ENV,
  isProduction: raw.NODE_ENV === 'production',
  port: raw.PORT,
  corsOrigins: raw.CORS_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  trustProxy: raw.TRUST_PROXY,
  db: {
    host: raw.DB_HOST,
    port: raw.DB_PORT,
    user: raw.DB_USER,
    password: raw.DB_PASSWORD,
    database: raw.DB_NAME,
    connectionLimit: raw.DB_CONNECTION_LIMIT,
  },
  rateLimit: {
    windowMs: raw.RATE_LIMIT_WINDOW_MINUTES * 60_000,
    max: raw.RATE_LIMIT_MAX,
    formWindowMs: raw.FORM_RATE_LIMIT_WINDOW_MINUTES * 60_000,
    formMax: raw.FORM_RATE_LIMIT_MAX,
  },
} as const;
