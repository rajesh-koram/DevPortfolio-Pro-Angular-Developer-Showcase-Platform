import { Router } from 'express';

import { createContactMessageHandler } from '../controllers/contact.controller.js';
import { asyncHandler } from '../utils/async-handler.js';

export const contactRouter = Router();

contactRouter.post('/', asyncHandler(createContactMessageHandler));
