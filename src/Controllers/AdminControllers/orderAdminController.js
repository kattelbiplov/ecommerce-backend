const Order = require('../../Models/Order');

const AdminOrderController = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('user products');
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await Order.findById(orderId).populate('user products');
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateDeliveryStatus: async (req, res) => {
        try {
            const orderId = req.params.id;
            const { newStatus } = req.body;

            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            order.deliveryStatus = newStatus;
            await order.save();

            res.json({ message: 'Delivery status updated successfully', order });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};


module.exports = AdminOrderController;
