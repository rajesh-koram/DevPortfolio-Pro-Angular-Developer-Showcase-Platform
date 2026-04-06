import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { projectSeedData } from '../data/project.seed.js';
import { serviceSeedData } from '../data/service.seed.js';
import { skillSeedData } from '../data/skill.seed.js';
import { ProjectModel } from '../models/project.model.js';
import { ServiceModel } from '../models/service.model.js';
import { SkillModel } from '../models/skill.model.js';

async function seedData(): Promise<void> {
  await connectDatabase();

  await Promise.all([
    ProjectModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    SkillModel.deleteMany({}),
  ]);

  await Promise.all([
    ProjectModel.insertMany(projectSeedData),
    ServiceModel.insertMany(serviceSeedData),
    SkillModel.insertMany(skillSeedData),
  ]);

  console.log(`Seeded ${projectSeedData.length} projects, ${serviceSeedData.length} services, and ${skillSeedData.length} skill groups.`);
  await disconnectDatabase();
}

seedData().catch(async (error) => {
  console.error('Failed to seed data', error);
  await disconnectDatabase();
  process.exit(1);
});
