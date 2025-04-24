import express from 'express';

import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController.js';

import { orderValidator } from '../validators/orderValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router()


router.post('/', orderValidator, validateRequest, createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);


export default router;