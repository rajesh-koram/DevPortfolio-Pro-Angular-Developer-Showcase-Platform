import { Request, Response } from 'express';

import { getServices } from '../services/service.service.js';

export async function getServicesHandler(_request: Request, response: Response): Promise<void> {
  const items = await getServices();

  response.status(200).json({ items });
}
