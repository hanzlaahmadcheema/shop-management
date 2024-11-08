const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    contactDetails: {
        type: String,
    },
    totalCredit: {
        type: Number,
        default: 0,
    },
    paymentHistory: [
        {
            amount: Number,
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Vendor', vendorSchema);
