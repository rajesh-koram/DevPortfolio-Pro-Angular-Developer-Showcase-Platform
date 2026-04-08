import { Request, Response } from 'express';

import { createContactMessage } from '../services/contact.service.js';
import { createContactMessageSchema } from '../validators/contact.validator.js';

export async function createContactMessageHandler(request: Request, response: Response): Promise<void> {
  const payload = createContactMessageSchema.parse(request.body);
  const { item, notification } = await createContactMessage(payload);

  response.status(notification.delivered ? 201 : 202).json({
    message: notification.delivered
      ? 'Project brief submitted successfully. The admin has been notified by email.'
      : `Project brief submitted successfully, but the admin email notification could not be sent. ${notification.reason}`,
    item,
    emailDelivered: notification.delivered,
  });
}
