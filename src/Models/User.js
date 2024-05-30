const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rewardPoint:{
        type:Number,
        default:0
    },
    role: {
        type: String,
        enum: ['admin', 'user'], 
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
