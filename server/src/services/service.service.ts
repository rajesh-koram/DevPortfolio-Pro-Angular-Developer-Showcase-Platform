import { ServiceModel } from '../models/service.model.js';

export async function getServices() {
  return ServiceModel.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
}
