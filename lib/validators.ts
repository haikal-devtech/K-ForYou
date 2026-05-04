import { z } from 'zod';

export const productSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  description: z.string().min(1, 'Description is required'),
  diasporaStory: z.string().min(1, 'Diaspora story is required'),
  priceIdr: z.coerce.number().min(0, 'Price must be greater than or equal to 0'),
  priceUsd: z.coerce.number().min(0, 'Price must be greater than or equal to 0'),
  stockQuantity: z.coerce.number().min(0, 'Stock must be greater than or equal to 0'),
  stockStatus: z.enum(['In Stock', 'Out of Stock', 'Pre-order']),
  weightGram: z.coerce.number().min(0, 'Weight must be greater than or equal to 0'),
  dimensions: z.string().optional(),
  originCity: z.string().min(1, 'Origin city is required'),
  supplierName: z.string().min(1, 'Supplier name is required'),
  isReadyStock: z.boolean(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.string().optional(), // Changed from transform so form hook doesn't complain about output type
});

export const inquirySchema = z.object({
  buyerName: z.string().min(1, 'Full name is required'),
  buyerEmail: z.string().email('Invalid email address'),
  buyerPhone: z.string().min(5, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  notes: z.string().optional(),
  preferredContact: z.enum(['WhatsApp', 'Email']),
});
