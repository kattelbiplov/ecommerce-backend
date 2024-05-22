const express = require('express');
const router = express.Router();
const AdminOrderController = require('../../Controllers/AdminControllers/orderAdminController');

router.get('/orders', AdminOrderController.getAllOrders);


router.get('/orders/:id', AdminOrderController.getOrderById);


router.patch('/orders/:id/deliveryStatus', AdminOrderController.updateDeliveryStatus);

module.exports = router;
