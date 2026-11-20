import express from 'express';
import productRoutes from './routes/product.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'ShopSphere product service running successfully.'
    });
});

app.use('/api/products', productRoutes);

app.use(errorMiddleware);

export default app;