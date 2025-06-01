import { z } from 'zod';
import { Season } from '@prisma/client';

const baseTireSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  size: z.string().min(1, 'Size is required'),
  season: z.nativeEnum(Season),
  price: z.number().positive('Price must be positive'),
  imageURL: z.string().url('Invalid image URL').optional(),
  description: z.string().optional(),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be non-negative'),
});

export const tireValidation = {
  createTire: baseTireSchema,
  updateTire: baseTireSchema.partial(),
}; 