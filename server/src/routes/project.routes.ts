import { Router } from 'express';

import { getProjectsHandler } from '../controllers/project.controller.js';
import { asyncHandler } from '../utils/async-handler.js';

export const projectRouter = Router();

projectRouter.get('/', asyncHandler(getProjectsHandler));
