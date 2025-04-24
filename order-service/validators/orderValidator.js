import { body } from 'express-validator';


export const orderValidator = [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('products').isArray({ min: 1 }).withMessage('At least one product is required'),
    body('products.*.productId').notEmpty().withMessage('Product ID is required'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
    body('address').notEmpty().withMessage('Address is required'),
    body('paymentMode').isIn(['COD', 'Card', 'UPI']).withMessage('Invalid payment mode')
];


