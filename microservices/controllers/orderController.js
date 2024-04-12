const Order = require('../models/Order');

// Controller function to create a new order
exports.createOrder = async (req, res) => {
  try {
    // Extract order data from request body
    const { userId, products, totalAmount } = req.body;

    // Create a new order
    const newOrder = new Order({ userId, products, totalAmount });
    await newOrder.save();

    // Send newly created order in response
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to fetch orders for a specific user
exports.getUserOrders = async (req, res) => {
  try {
    // Extract user ID from request params
    const userId = req.params.userId;

    // Fetch orders for the user from the database
    const userOrders = await Order.find({ userId });

    // Send the user's orders in response
    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to fetch details of a specific order
exports.getOrderDetails = async (req, res) => {
  try {
    // Extract order ID from request params
    const orderId = req.params.orderId;

    // Fetch order details from the database
    const order = await Order.findById(orderId);

    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send order details in response
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
