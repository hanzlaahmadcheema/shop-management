// controllers/reminderController.js

const Reminder = require('../models/Reminder');

// Get all reminders
exports.getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find().populate('relatedVendor', 'name');
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new reminder
exports.createReminder = async (req, res) => {
    const { description, date, relatedVendor } = req.body;

    const reminder = new Reminder({ description, date, relatedVendor });
    try {
        const newReminder = await reminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a reminder by ID
exports.updateReminder = async (req, res) => {
    try {
        const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReminder) return res.status(404).json({ message: 'Reminder not found' });
        res.json(updatedReminder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a reminder by ID
exports.deleteReminder = async (req, res) => {
    try {
        const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
        if (!deletedReminder) return res.status(404).json({ message: 'Reminder not found' });
        res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark a reminder as completed
exports.markAsCompleted = async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) return res.status(404).json({ message: 'Reminder not found' });

        reminder.isCompleted = true;
        await reminder.save();
        res.json({ message: 'Reminder marked as completed', reminder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
