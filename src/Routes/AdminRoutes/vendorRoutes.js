const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Middlewares/authMiddleware');
const vendorController = require('../../Controllers/AdminControllers/vendorController');


router.use(authMiddleware);


router.post('/add-vendors', authMiddleware, vendorController.createVendor);

router.get('/get-vendors',authMiddleware, vendorController.getAllVendor);

router.put('/update-vendor/:id', authMiddleware, vendorController.updateVendor);

router.delete('/delete-vendor/:id', authMiddleware, vendorController.deleteVendor);

module.exports = router;
