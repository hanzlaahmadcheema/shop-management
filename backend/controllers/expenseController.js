const Expense = require('../models/Expense');

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  const { description, amount, category } = req.body;
  try {
    const expense = new Expense({ description, amount, category });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Error adding expense' });
  }
};
