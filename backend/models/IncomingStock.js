const mongoose = require('mongoose');

const incomingStockSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    stockValue: {
        type: Number,
        required: true,
    },
    dateReceived: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
    },
    details: {
        type: String,
    }
});

module.exports = mongoose.model('IncomingStock', incomingStockSchema);