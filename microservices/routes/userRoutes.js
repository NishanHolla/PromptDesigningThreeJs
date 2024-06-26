const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware.authenticate, userController.getUserProfile);

router.put('/profile', authMiddleware.authenticate, userController.updateUserProfile);


module.exports = router;
