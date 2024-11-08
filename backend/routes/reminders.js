const express = require('express');
const {getReminders, createReminder, updateReminder, deleteReminder, markAsCompleted} = require('../controllers/reminderController');
const router = express.Router();

// CRUD routes for reminders
router.get('/', getReminders);
router.post('/', createReminder);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);
router.patch('/:id/complete', markAsCompleted);

module.exports = router;
