import { InferSchemaType, Schema, model } from 'mongoose';

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    details: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ContactMessageDocument = InferSchemaType<typeof contactMessageSchema>;

export const ContactMessageModel = model('ContactMessage', contactMessageSchema);
