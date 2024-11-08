const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  sales: {
    type: Number,
    required: true,
  },
  cashInHand: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense',
  }],
});

module.exports = mongoose.model('Report', ReportSchema);