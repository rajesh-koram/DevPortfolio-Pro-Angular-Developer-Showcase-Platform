import { ProjectModel } from '../models/project.model.js';

export async function getProjects() {
  return ProjectModel.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
}
