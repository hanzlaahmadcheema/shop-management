const IncomingStock = require('../models/IncomingStock');

// Get all incoming stock
exports.getIncomingStock = async (req, res) => {
    try {
        const stock = await IncomingStock.find().populate('vendor', 'name');
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add incoming stock
exports.addIncomingStock = async (req, res) => {
    const { vendor, stockValue, quantity, unitPrice } = req.body;

    const incomingStock = new IncomingStock({ vendor, stockValue, quantity, unitPrice });
    try {
        const newStock = await incomingStock.save();
        res.status(201).json(newStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an incoming stock entry by ID
exports.updateIncomingStock = async (req, res) => {
    try {
        const updatedStock = await IncomingStock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStock) return res.status(404).json({ message: 'Incoming stock not found' });
        res.json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an incoming stock entry by ID
exports.deleteIncomingStock = async (req, res) => {
    try {
        const deletedStock = await IncomingStock.findByIdAndDelete(req.params.id);
        if (!deletedStock) return res.status(404).json({ message: 'Incoming stock not found' });
        res.json({ message: 'Incoming stock deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};