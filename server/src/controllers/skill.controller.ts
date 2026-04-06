import { Request, Response } from 'express';

import { getSkills } from '../services/skill.service.js';

export async function getSkillsHandler(_request: Request, response: Response): Promise<void> {
  const items = await getSkills();

  response.status(200).json({ items });
}
