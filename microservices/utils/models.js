const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

mongoose.connect('mongodb+srv://hollanishan:nishanholla@cluster0.17plk7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

async function addCollections() {
  try {
    // Ensure all models have their collections created
    await User.createCollection();
    await Product.createCollection();
    await Order.createCollection();
    // Create collections for other models as needed
    console.log('Collections added successfully');
  } catch (error) {
    console.error('Error adding collections:', error);
  } finally {
    mongoose.disconnect();
  }
}

addCollections();
