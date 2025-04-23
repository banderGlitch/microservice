import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL or filename
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    stock: {
        type: Number,
        default: 0,
    },

}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema);
export default Product;


