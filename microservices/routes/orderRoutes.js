const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController'); // Assuming authController exists


router.post('/order', orderController.createOrder);

// GET route to fetch orders for a specific user
router.get('/orders/:userId', orderController.getUserOrders);

// GET route to fetch details of a specific order
router.get('/order/:orderId', orderController.getOrderDetails);

module.exports = router;
