import { SkillModel } from '../models/skill.model.js';

export async function getSkills() {
  return SkillModel.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
}
