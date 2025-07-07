import { z } from 'zod';

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().optional(),
  }),
});

export const updateCustomerSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid customer ID'),
  }),
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().optional(),
  }),
});

export const customerIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid customer ID'),
  }),
});

export const createVehicleSchema = z.object({
  params: z.object({
    customerId: z.string().uuid('Invalid customer ID'),
  }),
  body: z.object({
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    licensePlate: z.string().min(1, 'License plate is required'),
  }),
});

export const updateVehicleSchema = z.object({
  params: z.object({
    customerId: z.string().uuid('Invalid customer ID'),
    vehicleId: z.string().uuid('Invalid vehicle ID'),
  }),
  body: z.object({
    make: z.string().min(1, 'Make is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    licensePlate: z.string().min(1, 'License plate is required'),
  }),
});

export const vehicleIdSchema = z.object({
  params: z.object({
    customerId: z.string().uuid('Invalid customer ID'),
    vehicleId: z.string().uuid('Invalid vehicle ID'),
  }),
}); 