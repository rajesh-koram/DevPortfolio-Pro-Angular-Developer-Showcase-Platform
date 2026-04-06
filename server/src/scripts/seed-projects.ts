import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { projectSeedData } from '../data/project.seed.js';
import { ProjectModel } from '../models/project.model.js';

async function seedProjects(): Promise<void> {
  await connectDatabase();
  await ProjectModel.deleteMany({});
  await ProjectModel.insertMany(projectSeedData);
  console.log(`Seeded ${projectSeedData.length} projects.`);
  await disconnectDatabase();
}

seedProjects().catch(async (error) => {
  console.error('Failed to seed projects', error);
  await disconnectDatabase();
  process.exit(1);
});
