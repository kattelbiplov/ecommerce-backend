const express = require('express');
const router = express.Router();
const productController = require('../../Controllers/AdminControllers/productAdminController');
const authMiddleware = require('../../Middlewares/authMiddleware');

router.post('/add-product',authMiddleware, productController.createProduct);

router.get('/view-products',authMiddleware, productController.getAllProducts);

router.put('/edit-products/:id',authMiddleware, productController.updateProduct);

router.delete('/delete-products/:id',authMiddleware, productController.deleteProduct);

module.exports = router;
