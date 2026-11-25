import { describe, expect, test } from '@jest/globals';
import productSchema from '../../../src/validators/product.validator.js';

describe('product validator', () => {
    test('should accept the valid product', () => {
        const product = {
            name: 'Laptop',
            price: 55000,
            category: 'Electronics'
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(true);
    });

    test('should reject an empty product name', () => {
        const product = {
            name: '',
            price: 75000,
            category: 'Electronics'
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(false);
    });

    test('should reject a whitespace-only product name', () => {
        const product = {
            name: ' ',
            price: 75000,
            category: 'Electronics'
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(false);
    });

    test('should trim leading and trailing spaces', () => {
        const product = {
            name: ' Laptop ',
            price: 75000,
            category: ' Electronics '
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(true);
        expect(result.data.name).toBe('Laptop');
        expect(result.data.category).toBe('Electronics');
    });

    test('should reject negative price', () => {
        const product = {
            name: 'Laptop',
            price: -1500,
            category: 'Electronics'
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(false);
    });

    test('should reject zero price', () => {
        const product = {
            name: 'Laptop',
            price: 0,
            category: 'Electronics'
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(false);
    });

    test('should reject price provided as a string', () => {
        const product = {
            name: 'Laptop',
            price: '1500',
            category: 'Electronics'
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(false);
    });

    test('should reject an empty category', () => {
        const product = {
            name: 'Laptop',
            price: 1500,
            category: ''
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(false);
    });

    test('should accept a valid decimal price', () => {
        const product = {
            name: 'Laptop',
            price: 1500.00,
            category: 'Electronics'
        };
        const result = productSchema.safeParse(product);
        expect(result.success).toBe(true);
    });
})