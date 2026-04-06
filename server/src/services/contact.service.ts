import { ContactMessageModel } from '../models/contact.model.js';
import { CreateContactMessageInput } from '../validators/contact.validator.js';

export async function createContactMessage(input: CreateContactMessageInput) {
  return ContactMessageModel.create(input);
}
