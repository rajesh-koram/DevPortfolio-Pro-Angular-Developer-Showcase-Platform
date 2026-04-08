import { ContactMessageModel } from '../models/contact.model.js';
import { sendAdminContactNotification } from './mail.service.js';
import { CreateContactMessageInput } from '../validators/contact.validator.js';

export async function createContactMessage(input: CreateContactMessageInput) {
  const item = await ContactMessageModel.create(input);
  const notification = await sendAdminContactNotification(input);

  return {
    item,
    notification,
  };
}
