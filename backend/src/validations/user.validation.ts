import { z } from 'zod';

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID'),
  }),
  body: z.object({
    email: z.string().email('Invalid email address').optional(),
    name: z.string().min(1, 'Name is required').optional(),
    phone: z.string().min(1, 'Phone number is required').optional(),
    address: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    role: z.enum(['ADMIN', 'CUSTOMER']).optional(),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone number is required').optional(),
    address: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['ADMIN', 'CUSTOMER', 'STAFF']).optional(),
  }),
});

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