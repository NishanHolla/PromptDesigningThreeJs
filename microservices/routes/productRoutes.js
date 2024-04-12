const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for adding a new product
router.post('/add', authMiddleware.authenticate, authMiddleware.isAdmin, productController.addProduct);

// Route for removing a product
router.delete('/:productId', authMiddleware.authenticate, authMiddleware.isAdmin, productController.removeProduct);

// Other routes for managing products can be added here

module.exports = router;
