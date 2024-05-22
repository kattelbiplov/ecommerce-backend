const express = require('express');
const router = express.Router();
const productController = require('../../Controllers/AdminControllers/productAdminController');


router.post('/products', productController.createProduct);

router.get('/products', productController.getAllProducts);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
