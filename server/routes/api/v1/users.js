import express from 'express';

const router = express.Router();

// @route   POST api/v1/categories/
// @desc    Create Product Category
// @access  Private
router.post('/', isLoggedIn, isAdmin, createCategory);

module.exports = router;