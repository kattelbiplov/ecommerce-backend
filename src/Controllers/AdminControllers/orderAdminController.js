const Order = require('../../Models/Order');

const AdminOrderController = {
    getAllOrders: async (req, res) => {
        try {
            if (req.user.role!=='admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const orders = await Order.find().populate('user products');
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getOrderById: async (req, res) => {
        try {
            if (!req.role=='admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
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
            const updatedStatus = await Order.findByIdAndUpdate(orderId, { deliveryStatus:newStatus}, { new: true });
            if (!updatedStatus) {
                return res.status(404).json({ error: 'Delivery Status not found' });
            }
            res.json({ message: 'Delivery Status updated successfully', deliveryStatus: updatedStatus });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    
};


module.exports = AdminOrderController;
