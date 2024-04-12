const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for adding a new user
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route for removing a user
router.delete('/:userId', authMiddleware.authenticate, authMiddleware.isAdmin, userController.removeUser);

// Route for fetching user profile
router.get('/profile', authMiddleware.authenticate, userController.getUserProfile);

// Route for updating user profile
router.put('/profile', authMiddleware.authenticate, userController.updateUserProfile);

// Other routes for managing users can be added here

module.exports = router;
