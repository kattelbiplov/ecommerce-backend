const express = require('express');
const router = express.Router();
const UserOrderController = require('../../Controllers/UserControllers/orderUserController');

router.get('/orders', UserOrderController.getOrders);

router.post('/orders', UserOrderController.placeOrder);

module.exports = router;
