const express = require('express');
const router = express.Router();
const AdminOrderController = require('../../Controllers/AdminControllers/orderAdminController');
const authMiddleware = require('../../Middlewares/authMiddleware');

router.get('/view-orders',authMiddleware, AdminOrderController.getAllOrders);


router.get('/view-orders/:id',authMiddleware, AdminOrderController.getOrderById);


router.patch('/orders/:id/deliveryStatus',authMiddleware, AdminOrderController.updateDeliveryStatus);

module.exports = router;
