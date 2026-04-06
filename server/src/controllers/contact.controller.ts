import { Request, Response } from 'express';

import { createContactMessage } from '../services/contact.service.js';
import { createContactMessageSchema } from '../validators/contact.validator.js';

export async function createContactMessageHandler(request: Request, response: Response): Promise<void> {
  const payload = createContactMessageSchema.parse(request.body);
  const item = await createContactMessage(payload);

  response.status(201).json({
    message: 'Project brief submitted successfully.',
    item,
  });
}
