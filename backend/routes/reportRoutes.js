const express = require('express');
const {
    getDailyCashFlow,
    getVendorPaymentsReport,
    getExpenseByCategoryReport,
    getStockAndCreditReport,
    getFinancialSummary
} = require('../controllers/reportController');

const router = express.Router();

router.get('/cash-flow', getDailyCashFlow);
router.get('/vendor-payments', getVendorPaymentsReport);
router.get('/expense-category', getExpenseByCategoryReport);
router.get('/stock-credit', getStockAndCreditReport);
router.get('/financial-summary', getFinancialSummary);


module.exports = router;
