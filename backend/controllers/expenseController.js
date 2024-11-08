const Expense = require('../models/Expense');
const Category = require('../models/Category');

// Get all expenses
// Create a new expense with category reference
exports.createExpense = async (req, res) => {
    const { description, amount, category, vendor } = req.body;

    try {
        // Check if category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) return res.status(404).json({ message: 'Category not found' });

        const expense = new Expense({ description, amount, category, vendor });
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all expenses with populated category details
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
            .populate('category', 'name')
            .populate('vendor', 'name'); // Adjust if vendor also needs population
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update an expense by ID
exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
