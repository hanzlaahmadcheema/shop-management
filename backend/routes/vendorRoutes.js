const express = require('express');
const { getVendors, createVendor, recordVendorPayment, updateVendor, deleteVendor } = require('../controllers/vendorController');
const router = express.Router();

router.get('/', getVendors);
router.post('/', createVendor);
router.post('/payment', recordVendorPayment);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

module.exports = router;
