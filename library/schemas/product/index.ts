import { z } from 'zod';

export const ProductSchema = z.object({
    productName: z.string().min(1, 'Product name is required'),
    productSubtitle: z.string().optional(),
    price: z.preprocess(val => (typeof val === 'string' ? parseFloat(val) : val), z.number().min(1, 'Price is required')),
    description: z.string().min(10, 'Description is required'),
    productDetails: z.string().optional(),
    moreDetails: z.string().optional(),
    productImages: z
        .array(
            z.string({
                required_error: 'Must add one image',
                invalid_type_error: 'Must be a valid url',
            }),
        )
        .min(1, 'image is required'),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
