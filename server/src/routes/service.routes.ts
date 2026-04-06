import { Router } from 'express';

import { getServicesHandler } from '../controllers/service.controller.js';
import { asyncHandler } from '../utils/async-handler.js';

export const serviceRouter = Router();

serviceRouter.get('/', asyncHandler(getServicesHandler));
