const Vendor = require('../models/Vendor');

exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVendor = async (req, res) => {
    const vendor = new Vendor(req.body);
    try {
        const newVendor = await vendor.save();
        res.status(201).json(newVendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVendor) return res.status(404).json({ message: 'Vendor not found' });
        res.json(updatedVendor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a vendor by ID
exports.deleteVendor = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) return res.status(404).json({ message: 'Vendor not found' });
        res.json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Record payment to vendor
exports.recordVendorPayment = async (req, res) => {
    const { vendorId, amount } = req.body;
    try {
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

        vendor.totalCredit -= amount;
        vendor.paymentHistory.push({ amount, date: new Date() });

        await vendor.save();
        res.json(vendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};