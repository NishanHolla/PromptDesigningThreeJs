const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    // Extract product data from request body
    const { name, price, description } = req.body;

    // Create a new product
    const newProduct = new Product({ name, price, description });
    await newProduct.save();

    // Send newly created product in response
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
