// models/Reminder.js

const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    description: { type: String, required: true }, // Brief text of what needs to be reminded
    date: { type: Date, default: Date.now },       
    isCompleted: { type: Boolean, default: false }, // Track if the reminder is completed
    relatedVendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: false } // Optional vendor association
});

module.exports = mongoose.model('Reminder', ReminderSchema);
