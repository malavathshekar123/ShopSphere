/**
 * Add a positive price constraint to products table
 */
export const up = async (knex) => {
    await knex.raw(`
        ALTER TABLE products
        ADD CONSTRAINT products_price_positive_check
        CHECK (price > 0)
    `);
};

/**
 * Remove the positive price constraint
 */
export const down = async (knex) => {
    await knex.raw(`
        ALTER TABLE products
        DROP CONSTRAINT IF EXISTS products_price_positive_check
    `);
};