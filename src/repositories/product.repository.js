import db from '../config/database.js'

//Reusable filter conditions
const applyFilter = (query, filters = {}) => {
    const { search, category, minPrice, maxPrice } = filters;
    if(search){
        query.whereRaw(
            'LOWER(name) LIKE ?',
            [`%${search.toLowerCase()}%`]
        );
    }
    if(category){
        query.where('category', category);
    }
    if(minPrice !== undefined){
        query.where('price', '>=', minPrice);
    }
    if(maxPrice !== undefined){
        query.where('price', '<=', maxPrice);
    }
    return query;
}

const getAllProducts = async ({limit, offset, ...filters}) => {
    const query = applyFilter(db('products'), filters);
    return await query
        .select('*')
        .orderBy(
            filters.sortBy || 'id',
            filters.sortOrder || 'asc'
        )
        .orderBy('id', 'asc')
        .limit(limit)
        .offset(offset);
};

const getProductsCount = async (filters = {}) => {
    const query = applyFilter(db('products'), filters);
    const result = await query
        .count('id as total')
        .first();

    return Number(result.total);
};

const createProduct = async (productData) => {
    const [newProduct] = await db('products')
        .insert(productData)
        .returning('*');
    return newProduct
}

const updateProduct = async (id, productData) => {
    const [updatedProduct] = await db('products')
        .where({ id })
        .update({
            ...productData,
            updated_at: db.fn.now()
        })
        .returning('*');
    return updatedProduct || null;
}

const deleteProduct = async (id) => {
    const [deletedProduct] = await db('products')
        .where({ id })
        .delete()
        .returning('*')
    return deletedProduct || null;
}

export default {
    getAllProducts,
    getProductsCount,
    createProduct,
    updateProduct,
    deleteProduct
};
