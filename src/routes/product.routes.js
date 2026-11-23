import express from 'express';
import productController from '../controllers/product.controller.js';
import productSchema from '../validators/product.validator.js';
import validate from '../middlewares/validate.middleware.js';
import paginationSchema from '../validators/pagination.validator.js';

const router = express.Router();


router.get('/getAllProducts', validate(paginationSchema, 'query'), productController.getAllProducts);
router.post('/createProduct', validate(productSchema), productController.createProduct);
router.put('/updateProduct/:id', validate(productSchema), productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

export default router;