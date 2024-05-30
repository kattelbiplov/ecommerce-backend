const express = require('express');
const router = express.Router();
const promoCodeController = require('../../Controllers/AdminControllers/promoCodeController');
const authMiddleware = require('../../Middlewares/authMiddleware');

router.post('/add-promoCode',authMiddleware,promoCodeController.createPromoCode );

router.get('/view-promoCode',authMiddleware, promoCodeController.getAllPromoCodes);

router.put('/edit-promoCode/:id',authMiddleware, promoCodeController.updatePromoCode);

router.delete('/delete-promoCode/:id',authMiddleware, promoCodeController.deletePromoCode);

module.exports = router;
