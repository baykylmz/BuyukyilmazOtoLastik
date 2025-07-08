import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Service name is required'),
    description: z.string().min(1, 'Service description is required'),
    price: z.number().positive('Price must be positive'),
    durationMinutes: z.number().int().positive('Duration must be a positive integer'),
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid service ID'),
  }),
  body: z.object({
    name: z.string().min(1, 'Service name is required').optional(),
    description: z.string().min(1, 'Service description is required').optional(),
    price: z.number().positive('Price must be positive').optional(),
    durationMinutes: z.number().int().positive('Duration must be a positive integer').optional(),
  }),
});

export const serviceIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid service ID'),
  }),
}); 