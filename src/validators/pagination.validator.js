import { z } from 'zod';

const paginationSchema = z.object({
    //pagination
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),

    //search
    search: z.string().trim().min(1, 'Search cannot be empty').optional(),

    //Filters
    category: z.string().trim().min(1, 'Category cannot be empty').optional(),
    minPrice: z.coerce.number().finite().min(0).optional(),
    maxPrice: z.coerce.number().finite().min(0).optional(),

    //sorting
    sortBy: z.enum(['id', 'name', 'price']).default('id'),
    sortOrder:z.enum(['asc', 'desc']).default('asc')
}).superRefine((data, ctx) => {
    if(data.minPrice !== undefined && data.maxPrice !== undefined && data.minPrice > data.maxPrice){
        ctx.addIssue({
            code: 'custom',
            path: ['minPrice'],
            message: 'Minimum price cannot be greater than maximum price.'
        });
    }
});

export default paginationSchema;