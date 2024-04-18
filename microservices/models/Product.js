const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true // Ensure productId is unique
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String, // Assuming the image source will be a URL
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
