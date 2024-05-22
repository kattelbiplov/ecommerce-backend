const express = require('express');
const router = express.Router();
const authController = require('../../Controllers/UserControllers/authController');


router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

module.exports = router;
