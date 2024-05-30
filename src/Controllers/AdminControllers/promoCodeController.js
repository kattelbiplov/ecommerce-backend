const PromoCode = require('../../Models/PromoCode');


const promoCodeController = {

    // Create a new promo code
    createPromoCode: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const { code, discountType, value } = req.body;
            const newPromoCode = new PromoCode({ code, discountType, value });
            await newPromoCode.save();
            res.status(201).send(newPromoCode);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Get all promo codes
    getAllPromoCodes: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const promoCodes = await PromoCode.find();
            res.send(promoCodes);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Update promo code by ID
    updatePromoCode: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const promoCode = await PromoCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!promoCode) {
                return res.status(404).send({ message: 'Promo code not found' });
            }
            res.send(promoCode);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Delete promo code by ID
    deletePromoCode: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
            if (!promoCode) {
                return res.status(404).send({ message: 'Promo code not found' });
            }
            res.send({ message: 'Promo code deleted successfully' });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}

module.exports = promoCodeController;
