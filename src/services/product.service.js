import productRepository from "../repositories/product.repository.js";

const getAllProducts = async ({page, limit, ...filters}) => {
    const offset = (page - 1) * limit;
    const [products, totalRecords] = await Promise.all([
        productRepository.getAllProducts({limit, offset, ...filters}),
        productRepository.getProductsCount(filters)
    ]);
    const totalPages = Math.ceil(totalRecords / limit);
    return {
        products,
        pagination: {
            currentPage: page,
            limit,
            totalRecords,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1 && totalRecords > 0
        }
    }
}

const createProduct = (productData) => {
    return productRepository.createProduct(productData);
}

const updateProduct = (id, productData) => {
    return productRepository.updateProduct(id, productData);
}

const deleteProduct = (id) => {
    return productRepository.deleteProduct(id);
}

export default {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}