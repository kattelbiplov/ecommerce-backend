const Order = require('../../Models/Order');

const UserOrderController = {
    getOrders: async (req, res) => {
        try {
            const userId = req.user._id;
            const orders = await Order.find({ user: userId }).populate('products');
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    placeOrder: async (req, res) => {
        try {
            const { products, totalPrice } = req.body;
            const userId = req.user._id; 

            const newOrder = new Order({ user: userId, products, totalPrice });
            await newOrder.save();

            res.status(201).json({ message: 'Order placed successfully', order: newOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = UserOrderController;
