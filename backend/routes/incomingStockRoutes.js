const express = require('express');
const { getIncomingStock, addIncomingStock, updateIncomingStock, deleteIncomingStock } = require('../controllers/incomingStockController');
const router = express.Router();

router.get('/', getIncomingStock);
router.post('/', addIncomingStock);
router.put('/:id', updateIncomingStock);
router.delete('/:id', deleteIncomingStock);

module.exports = router;
