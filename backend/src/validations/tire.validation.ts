import { z } from 'zod';
import { Season } from '@prisma/client';

const baseTireSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  size: z.string().min(1, 'Size is required'),
  season: z.nativeEnum(Season, {
    errorMap: () => ({ message: 'Season must be SUMMER, WINTER, or ALL_SEASON' }),
  }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive('Price must be positive'),
  stockQuantity: z
    .number({
      required_error: 'Stock quantity is required',
      invalid_type_error: 'Stock quantity must be a number',
    })
    .int('Stock quantity must be an integer')
    .min(0, 'Stock quantity must be non-negative'),
  imageURL: z.string().url('Invalid image URL').optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
});

// Named exports for the new route structure
export const createTireSchema = z.object({
  body: baseTireSchema,
});

export const updateTireSchema = z.object({
  body: baseTireSchema.partial(),
  params: z.object({
    id: z.string().uuid('Invalid tire ID'),
  }),
});

export const tireIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tire ID'),
  }),
});

export const updateStockSchema = z.object({
  body: z.object({
    change: z
      .number({
        required_error: 'Stock change amount is required',
        invalid_type_error: 'Stock change must be a number',
      })
      .int('Stock change must be an integer'),
    reason: z.string().min(1, 'Reason for stock change is required'),
  }),
  params: z.object({
    id: z.string().uuid('Invalid tire ID'),
  }),
});

// Legacy exports for backward compatibility
export const tireValidation = {
  createTire: baseTireSchema,
  updateTire: baseTireSchema.partial(),
}; 