const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Middlewares/authMiddleware');
const categoryController = require('../../Controllers/AdminControllers/categoryConroller');


router.use(authMiddleware);


router.post('/add-categories', authMiddleware, categoryController.createCategory);

router.get('/get-categories',authMiddleware, categoryController.getAllCategories);

router.put('/update-categories/:id', authMiddleware, categoryController.updateCategory);

router.delete('/delete-categories/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;
