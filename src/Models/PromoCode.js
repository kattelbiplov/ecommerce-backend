const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    value: {
        type: Number,
        required: true
    },
});
const PromoCode = mongoose.model('PromoCode', promoSchema);

module.exports = PromoCode;
