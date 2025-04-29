import Order from '../models/Orders.js';
import axios from 'axios';
import { produceOrderCreated } from '../kafka/orderProducer.js';

export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, userId, address, paymentMode } = req.body
        // old method 
        // 1. Validate each product ID from product-service

        // for (const item of products) {
        //     try {
        //         // try to use kafka in place of this 
        //         const { data } = await axios.get(`http://localhost:5000/products/${item.productId}`);
        //         //  // You can also check stock/price here if needed
        //     } catch (err) {
        //         return res.status(400).json({ message: `Invalid product ID: ${item.productId}` })
        //     }
        // }

        const order = new Order({ userId, products, totalAmount, address, paymentMode });
        const saved = await order.save();
        // Emit Event 
        await produceOrderCreated(saved)

        res.status(201).json(saved);

    } catch (err) {
        res.status(500).json({ message: 'Failed to create order', error: err.message });
    }
};


export const getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};

export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
};



export const updateOrder = async (req, res) => {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json(updated);
};

export const deleteOrder = async (req, res) => {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order cancelled' });
};









// Do you already kafka installed locall
// eg con



