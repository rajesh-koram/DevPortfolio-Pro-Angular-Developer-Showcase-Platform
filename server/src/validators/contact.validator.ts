import { z } from 'zod';

export const createContactMessageSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().trim().max(120),
  details: z.string().trim().min(10).max(3000),
});

export type CreateContactMessageInput = z.infer<typeof createContactMessageSchema>;
