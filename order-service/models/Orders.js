import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 1 },
        }
    ],
    totalAmount: { type: Number, required: true },

    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    address: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['COD', 'Card', 'UPI'],
        default: 'COD'
    }


}, {timestamps : true});

const order = mongoose.model('Order', orderSchema)

export default order;

