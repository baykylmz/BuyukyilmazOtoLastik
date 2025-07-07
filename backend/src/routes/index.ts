import { Express } from 'express';
import { tireRoutes } from './tire.routes';
import authRoutes from './auth.routes';

export const setupRoutes = (app: Express) => {
  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/tires', tireRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Route not found',
    });
  });
}; 