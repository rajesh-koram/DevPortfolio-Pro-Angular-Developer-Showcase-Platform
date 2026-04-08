import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import { z } from 'zod';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(currentDirectory, '..', '..');
const runtimeEnvironment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const envFileName = runtimeEnvironment === 'production' ? '.env.prod' : '.env.dev';
const envFilePath = path.join(serverRoot, envFileName);
const fileEnv = fs.existsSync(envFilePath) ? dotenv.parse(fs.readFileSync(envFilePath)) : {};

function getEnvValue(...keys: string[]): string | undefined {
  for (const key of keys) {
    const processValue = process.env[key];

    if (processValue !== undefined) {
      return processValue;
    }

    const fileValue = fileEnv[key];

    if (fileValue !== undefined) {
      return fileValue;
    }
  }

  return undefined;
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI or MONGODB_URL is required'),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:4200'),
  CLIENT_DIST_PATH: z.string().trim().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  MAIL_FROM: z.string().email().optional(),
  SMTP_HOST: z.string().trim().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_SECURE: z.enum(['true', 'false']).default('false'),
  SMTP_USER: z.string().trim().min(1).optional(),
  SMTP_PASS: z.string().trim().min(1).optional(),
});

export const env = envSchema.parse({
  NODE_ENV: runtimeEnvironment,
  PORT: getEnvValue('PORT'),
  MONGODB_URI: getEnvValue('MONGODB_URI', 'MONGODB_URL'),
  CLIENT_ORIGIN: getEnvValue('CLIENT_ORIGIN'),
  CLIENT_DIST_PATH: getEnvValue('CLIENT_DIST_PATH'),
  ADMIN_EMAIL: getEnvValue('ADMIN_EMAIL'),
  MAIL_FROM: getEnvValue('MAIL_FROM'),
  SMTP_HOST: getEnvValue('SMTP_HOST'),
  SMTP_PORT: getEnvValue('SMTP_PORT'),
  SMTP_SECURE: getEnvValue('SMTP_SECURE'),
  SMTP_USER: getEnvValue('SMTP_USER'),
  SMTP_PASS: getEnvValue('SMTP_PASS'),
});
