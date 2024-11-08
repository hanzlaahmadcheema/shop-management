// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');

// Get all categories
router.get('/', getCategories);

// Add a new category
router.post('/', createCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
