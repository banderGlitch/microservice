import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    try {
      const order = new Order(req.body);
      const saved = await order.save();
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
  





  

