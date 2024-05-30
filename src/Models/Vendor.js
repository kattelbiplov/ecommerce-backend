const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true, 
         unique: true 
    },
    location:{
        type:String,
        required:true
    }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
