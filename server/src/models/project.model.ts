import { InferSchemaType, Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    timeline: { type: String, required: true, trim: true },
    techStack: { type: [String], required: true, default: [] },
    achievements: { type: [String], required: true, default: [] },
    liveDemoUrl: { type: String, required: true, trim: true },
    githubUrl: { type: String, required: true, trim: true },
    isFeatured: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

export const ProjectModel = model('Project', projectSchema);
