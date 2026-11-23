import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),

    DB_HOST: z.string().trim().min(1, 'DB_HOST is required'),
    DB_PORT: z.coerce.number().int().min(1).max(65535),
    DB_NAME: z.string().trim().min(1, 'DB_NAME is required'),
    DB_USER: z.string().trim().min(1, 'DB_USER is required'),
    DB_PASSWORD: z.string().min(1, 'DB_PASSWORD is required')
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error('Invalid environment configuration:');
    console.error(result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
    })));

    process.exit(1);
}

export default result.data;