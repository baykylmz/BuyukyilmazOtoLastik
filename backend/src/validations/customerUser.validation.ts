import { z } from 'zod';

// Vehicle validation schemas
export const createVehicleSchema = z.object({
  body: z.object({
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    licensePlate: z.string().min(1, 'License plate is required'),
  }),
});

export const updateVehicleSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid vehicle ID'),
  }),
  body: z.object({
    make: z.string().min(1, 'Make is required').optional(),
    model: z.string().min(1, 'Model is required').optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
    licensePlate: z.string().min(1, 'License plate is required').optional(),
  }),
});

export const vehicleIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid vehicle ID'),
  }),
});

// Appointment validation schemas
export const createAppointmentSchema = z.object({
  body: z.object({
    serviceId: z.string().uuid('Invalid service ID'),
    customerName: z.string().min(1, 'Customer name is required'),
    customerPhone: z.string().min(1, 'Customer phone is required'),
    vehicleModel: z.string().min(1, 'Vehicle model is required'),
    preferredDateTime: z.string().datetime('Invalid date format'),
    notes: z.string().optional(),
  }),
});

export const updateAppointmentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid appointment ID'),
  }),
  body: z.object({
    preferredDateTime: z.string().datetime('Invalid date format').optional(),
    notes: z.string().optional(),
  }),
});

export const appointmentIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid appointment ID'),
  }),
}); 