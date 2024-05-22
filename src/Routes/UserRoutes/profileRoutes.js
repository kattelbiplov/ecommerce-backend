const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Middlewares/authMiddleware');
const profileController = require('../../Controllers/UserControllers/profileController');

// Middleware to authenticate user
router.use(authMiddleware);

// GET user profile
router.get('/profile', profileController.getUserProfile);

// PUT update user profile
router.put('/profile', profileController.updateUserProfile);

// PUT change user password
router.put('/password', profileController.changeUserPassword);

module.exports = router;
