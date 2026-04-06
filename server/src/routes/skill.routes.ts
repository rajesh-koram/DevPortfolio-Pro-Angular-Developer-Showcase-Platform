import { Router } from 'express';

import { getSkillsHandler } from '../controllers/skill.controller.js';
import { asyncHandler } from '../utils/async-handler.js';

export const skillRouter = Router();

skillRouter.get('/', asyncHandler(getSkillsHandler));
