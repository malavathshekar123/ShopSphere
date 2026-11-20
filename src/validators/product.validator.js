import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    price: z.number().positive('Price must be positive integer'),
    category: z.string().min(1, 'Product category is required')
})

export default productSchema;