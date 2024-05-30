const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Middlewares/authMiddleware');
const profileController = require('../../Controllers/UserControllers/profileController');

// Middleware to authenticate user
router.use(authMiddleware);

// GET user profile
router.get('/get-profile', authMiddleware,profileController.getUserProfile);

// PUT update user profile
router.put('/edit-profile', authMiddleware,profileController.updateUserProfile);

// PUT change user password
router.put('/password', profileController.changeUserPassword);

module.exports = router;
