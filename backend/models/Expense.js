// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category model
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);