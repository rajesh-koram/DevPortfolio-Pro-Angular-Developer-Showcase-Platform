import { InferSchemaType, Schema, model } from 'mongoose';

const serviceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ServiceDocument = InferSchemaType<typeof serviceSchema>;

export const ServiceModel = model('Service', serviceSchema);
