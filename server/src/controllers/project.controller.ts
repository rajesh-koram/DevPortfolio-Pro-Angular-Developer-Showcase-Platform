import { Request, Response } from 'express';

import { getProjects } from '../services/project.service.js';

export async function getProjectsHandler(_request: Request, response: Response): Promise<void> {
  const items = await getProjects();

  response.status(200).json({ items });
}
