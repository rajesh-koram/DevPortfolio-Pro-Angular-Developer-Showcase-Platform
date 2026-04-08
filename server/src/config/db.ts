import mongoose from 'mongoose';

import { env } from './env.js';

let databaseListenersRegistered = false;
let connectionPromise: Promise<void> | null = null;

function resolveDatabaseStatus(): string {
  switch (mongoose.connection.readyState) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return 'unknown';
  }
}

function registerDatabaseListeners(): void {
  if (databaseListenersRegistered) {
    return;
  }

  mongoose.connection.on('connected', () => {
    console.info(`[database] connected: ${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[database] disconnected');
  });

  mongoose.connection.on('disconnecting', () => {
    console.warn('[database] disconnecting');
  });

  mongoose.connection.on('reconnected', () => {
    console.info('[database] reconnected');
  });

  mongoose.connection.on('error', (error) => {
    console.error('[database] connection error:', error);
  });

  databaseListenersRegistered = true;
}

export async function connectDatabase(): Promise<void> {
  registerDatabaseListeners();

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  console.info(`[database] status: ${resolveDatabaseStatus()}`);
  console.info('[database] connecting...');

  connectionPromise = mongoose
    .connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    .then(() => undefined)
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  await connectionPromise;
}

export async function disconnectDatabase(): Promise<void> {
  console.info(`[database] status: ${resolveDatabaseStatus()}`);
  connectionPromise = null;
  await mongoose.disconnect();
}

export function getDatabaseStatus(): string {
  return resolveDatabaseStatus();
}
