const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true 
  },
  userId: {
    type: String,
    required: true
  },
  products: [{
    type: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
