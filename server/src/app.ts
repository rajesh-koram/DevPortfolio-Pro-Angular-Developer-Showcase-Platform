import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import { Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';

import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';
import { contactRouter } from './routes/contact.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { projectRouter } from './routes/project.routes.js';
import { serviceRouter } from './routes/service.routes.js';
import { skillRouter } from './routes/skill.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import { asyncHandler } from './utils/async-handler.js';

type ClientBuild = {
  directory: string;
  indexFile: string;
};

function resolveClientBuild(): ClientBuild | null {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  const serverRoot = path.resolve(currentDirectory, '..');
  const workspaceRoot = path.resolve(serverRoot, '..');
  const configuredClientDistPath = env.CLIENT_DIST_PATH
    ? path.resolve(serverRoot, env.CLIENT_DIST_PATH)
    : path.join(workspaceRoot, 'client', 'dist', 'devportfolio-pro', 'browser');
  const indexFile = path.join(configuredClientDistPath, 'index.html');

  if (!fs.existsSync(indexFile)) {
    return null;
  }

  return {
    directory: configuredClientDistPath,
    indexFile,
  };
}

export function createApp() {
  const app = express();
  const clientBuild = resolveClientBuild();
  const ensureDatabaseConnection = asyncHandler(async (_request, _response, next) => {
    await connectDatabase();
    next();
  });

  app.disable('x-powered-by');

  if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  app.get('/api', (_request: Request, response: Response) => {
    response.status(200).json({
      message: 'DevPortfolio Pro API is running',
      environment: env.NODE_ENV,
    });
  });

  app.use('/api/health', healthRouter);
  app.use('/api/projects', ensureDatabaseConnection, projectRouter);
  app.use('/api/services', ensureDatabaseConnection, serviceRouter);
  app.use('/api/skills', ensureDatabaseConnection, skillRouter);
  app.use('/api/contact', ensureDatabaseConnection, contactRouter);

  if (clientBuild) {
    app.use(
      express.static(clientBuild.directory, {
        index: false,
        immutable: env.NODE_ENV === 'production',
        maxAge: env.NODE_ENV === 'production' ? '1y' : 0,
      }),
    );

    app.get(/^(?!\/api(?:\/|$)).*/, (_request: Request, response: Response) => {
      response.sendFile(clientBuild.indexFile);
    });
  } else {
    app.get('/', (_request: Request, response: Response) => {
      response.status(200).json({
        message: 'DevPortfolio Pro API is running',
        environment: env.NODE_ENV,
      });
    });
  }

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
