const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for creating admin user (accessible only to admin)
router.post('/create-admin', authMiddleware.authenticate, authMiddleware.isAdmin, adminController.createAdminUser);

// Routes for managing products
router.post('/products/add', authMiddleware.authenticate, authMiddleware.isAdmin, adminController.addProduct);
router.delete('/products/:productId', authMiddleware.authenticate, authMiddleware.isAdmin, adminController.removeProduct);

// Routes for managing users
router.post('/users/add', authMiddleware.authenticate, authMiddleware.isAdmin, adminController.addUser);
router.delete('/users/:userId', authMiddleware.authenticate, authMiddleware.isAdmin, adminController.removeUser);
router.get('/users', authMiddleware.authenticate, authMiddleware.isAdmin, adminController.getAllUsers);

module.exports = router;