import { createApp } from '../src/app.js';

const app = createApp();

export default async function handler(request: unknown, response: unknown): Promise<void> {
  app(request as never, response as never);
}