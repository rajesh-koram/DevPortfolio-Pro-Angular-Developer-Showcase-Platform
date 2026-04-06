import { Request, Response } from 'express';
import mongoose from 'mongoose';

export function getHealthStatus(_request: Request, response: Response): void {
  response.status(200).json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
}
