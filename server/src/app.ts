import cors from 'cors';
import { Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';

import { env } from './config/env.js';
import { contactRouter } from './routes/contact.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { projectRouter } from './routes/project.routes.js';
import { serviceRouter } from './routes/service.routes.js';
import { skillRouter } from './routes/skill.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/', (_request: Request, response: Response) => {
    response.status(200).json({
      message: 'DevPortfolio Pro API is running',
    });
  });

  app.use('/api/health', healthRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/services', serviceRouter);
  app.use('/api/skills', skillRouter);
  app.use('/api/contact', contactRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
