const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    }],
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'], 
        default: 'Pending' 
    },
    deliveryStatus: { 
        type: String, 
        enum: ['Received', 'Processing', 'Shipping', 'Delivered'], 
        default: 'Processing' 
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
