import { createApp } from './app.js';
import { connectDatabase, disconnectDatabase, getDatabaseStatus } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();
  let isShuttingDown = false;

  const shutdown = async (reason: string, exitCode = 0): Promise<void> => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;
    console.warn(`[server] ${reason}`);

    server.close(async () => {
      try {
        await disconnectDatabase();
        console.info(`[server] database status after shutdown: ${getDatabaseStatus()}`);
        console.info('[server] shutdown complete');
        process.exit(exitCode);
      } catch (error) {
        console.error('[server] shutdown error:', error);
        process.exit(1);
      }
    });
  };

  const server = app.listen(env.PORT, () => {
    console.info(`[server] listening on port ${env.PORT} (${env.NODE_ENV})`);
    console.info(`[server] database status: ${getDatabaseStatus()}`);
  });

  server.on('close', () => {
    console.warn('[server] stopped');
  });

  server.on('error', (error) => {
    console.error('[server] error:', error);
    void disconnectDatabase()
      .then(() => {
        console.info(`[server] database status after error: ${getDatabaseStatus()}`);
      })
      .finally(() => {
        process.exit(1);
      });
  });

  process.once('SIGINT', () => {
    void shutdown('received SIGINT; shutting down...');
  });

  process.once('SIGTERM', () => {
    void shutdown('received SIGTERM; shutting down...');
  });
}

bootstrap().catch((error) => {
  console.error('[server] failed to start:', error);
  process.exit(1);
});
