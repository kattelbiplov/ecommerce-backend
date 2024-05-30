const express = require('express');
const router = express.Router();
const UserOrderController = require('../../Controllers/UserControllers/orderUserController');
const authMiddleware = require('../../Middlewares/authMiddleware');

router.get('/orders',authMiddleware, UserOrderController.getOrders);

router.post('/place-orders',authMiddleware, UserOrderController.placeOrder);

module.exports = router;
