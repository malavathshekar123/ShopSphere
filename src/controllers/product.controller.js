import productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
    console.log("request validated query", req.validatedQuery);
    const result = await productService.getAllProducts(req.validatedQuery);

    return res.status(200).json({
        success: true,
        message: 'All products retrieved successfully.',
        data: result.products,
        pagination: result.pagination
    });
}

const createProduct = async (req, res) => {
    const newProduct = await productService.createProduct(req.body);
    return res.status(201).json({
        success: true,
        message: 'product created successfully.',
        data: newProduct
    });
};

const updateProduct = async (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <=0 ){
        return res.status(400).json({
            success: false,
            message: "invalid product id"
        });
    }
    const updatedProduct = await productService.updateProduct(id, req.body);

    if(!updatedProduct){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Product updated successfully.',
        data: updatedProduct
    });
}

const deleteProduct = async (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({
            success: false,
            message: 'Invalid Product Id'
        });
    };
    const deletedProduct = await productService.deleteProduct(id);

    if(!deletedProduct){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    };

    return res.status(200).json({
        success: true,
        message: 'Product deleted Successfully.',
        data: deletedProduct
    });

}

export default {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}