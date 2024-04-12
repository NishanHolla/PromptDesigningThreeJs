const Order = require('../models/Order'); // Import the Order model
const chance = require('chance');
const mongoose = require('mongoose'); // For generating fake user IDs

const numOrders = 160;

const generateFakeProduct = () => {
  const c = new chance();
  return c.string({ length: 10, alpha: true, numeric: true }); 
};

const generateFakeOrder = () => {
  const c = new chance();
  return {
    orderId: c.string({ length: 10, alpha: true, numeric: true }), 
    userId: c.string({length: 10, alpha: true, numeric:true}),
    products: [generateFakeProduct(), generateFakeProduct()], 
    totalAmount: c.floating({ min: 10, max: 1000, fixed: 2 }), 
  };
};

const pushOrders = async () => {
  try {
    // Replace with your MongoDB connection URI
    const mongoURI = 'mongodb+srv://hollanishan:nishanholla@cluster0.17plk7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const orders = [];
    for (let i = 0; i < numOrders; i++) {
      orders.push(generateFakeOrder());
    }

    await Order.insertMany(orders);
    console.log(`${numOrders} fake orders inserted!`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
};

pushOrders();
