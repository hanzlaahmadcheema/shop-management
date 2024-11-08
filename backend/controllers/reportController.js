const Expense = require('../models/Expense');
const IncomingStock = require('../models/IncomingStock');
const Vendor = require('../models/Vendor');

// 1. Daily Cash Flow Report
exports.getDailyCashFlow = async (req, res) => {
    try {
        const { date } = req.query;
        const selectedDate = date ? new Date(date) : new Date();

        // Get total expenses for the day
        const dailyExpenses = await Expense.aggregate([
            { $match: { date: { $gte: selectedDate, $lt: new Date(selectedDate).setDate(selectedDate.getDate() + 1) } } },
            { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
        ]);

        const totalExpense = dailyExpenses[0]?.totalExpense || 0;

        // Calculate daily cash flow
        const cashInHand = req.body.cashInHand || 0;  // Assume cashInHand is passed from frontend
        const dailySales = req.body.dailySales || 0;  // Assume daily sales amount is passed from frontend
        const dailyProfit = dailySales - totalExpense + cashInHand;

        res.json({ cashInHand, dailySales, totalExpense, dailyProfit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Vendor Payment Report
exports.getVendorPaymentsReport = async (req, res) => {
    try {
        const vendors = await Vendor.find().select('name totalCredit paymentHistory');
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Expense Report by Category
exports.getExpenseByCategoryReport = async (req, res) => {
    try {
        const expensesByCategory = await Expense.aggregate([
            { $group: { _id: "$category", totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } },
            { $sort: { totalAmount: -1 } }
        ]);

        res.json(expensesByCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Stock and Credit Report
exports.getStockAndCreditReport = async (req, res) => {
    try {
        const incomingStock = await IncomingStock.find()
            .populate('vendor', 'name')
            .select('stockValue dateReceived vendor');

        res.json(incomingStock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFinancialSummary = async (req, res) => {
  try {
      // Fetch all expenses and calculate total
      const totalExpenses = await Expense.aggregate([
          { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);

      // Fetch all incoming stock costs to calculate total stock payments to vendors
      const totalStockCost = await IncomingStock.aggregate([
          { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);

      // Calculate total sales based on your sales data (mocked here for illustration)
      const totalSales = req.body.totalSales || 0;  // This value should ideally be fetched from a sales model or input

      // Calculate opening cash (if applicable)
      const openingCash = req.body.openingCash || 0;

      // Calculate cash in hand
      const cashInHand = openingCash + totalSales - totalExpenses[0]?.total - totalStockCost[0]?.total;

      // Prepare the report summary
      const reportSummary = {
          totalSales,
          totalExpenses: totalExpenses[0]?.total || 0,
          totalStockCost: totalStockCost[0]?.total || 0,
          cashInHand,
          profitOrLoss: totalSales - totalExpenses[0]?.total - totalStockCost[0]?.total
      };

      res.json(reportSummary);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};