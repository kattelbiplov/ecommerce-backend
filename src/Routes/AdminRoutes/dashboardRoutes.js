const express = require('express');
const router = express.Router();

const DashboardController = require('../../Controllers/AdminControllers/dashboardController');
const authMiddleware = require('../../Middlewares/authMiddleware');

router.get('/dashboard',authMiddleware, DashboardController.getDashboardData);


module.exports = router;
