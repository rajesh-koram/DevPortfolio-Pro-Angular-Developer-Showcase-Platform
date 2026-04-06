import { InferSchemaType, Schema, model } from 'mongoose';

const skillSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    items: { type: [String], required: true, default: [] },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type SkillDocument = InferSchemaType<typeof skillSchema>;

export const SkillModel = model('Skill', skillSchema);
