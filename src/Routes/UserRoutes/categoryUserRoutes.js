const express = require('express');
const router = express.Router();
const categoryController = require('../../Controllers/UserControllers/categoryUserController');


router.get('/get-all-categories', categoryController.getAllCategories);

module.exports = router;
