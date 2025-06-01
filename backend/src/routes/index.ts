import { Express } from 'express';
import { tireRoutes } from './tire.routes';
import { serviceRoutes } from './service.routes';
import { appointmentRoutes } from './appointment.routes';
import { authRoutes } from './auth.routes';
import { contactRoutes } from './contact.routes';

export const setupRoutes = (app: Express) => {
  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // API routes
  app.use('/api/tires', tireRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/contact', contactRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Route not found',
    });
  });
}; 