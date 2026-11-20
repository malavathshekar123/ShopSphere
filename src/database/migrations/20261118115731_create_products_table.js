/**
 * Create products table
 */
export const up = async (knex) => {
    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name', 150).notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.string('category', 100).notNullable();
        table.timestamps(true, true);
    });
};

/**
 * Rollback products table
 */
export const down = async (knex) => {
    await knex.schema.dropTableIfExists('products');
}