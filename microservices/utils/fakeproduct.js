const Product = require('../models/Product'); 
const mongoose = require('mongoose');
const chance = require('chance');

const numProducts = 180;

const generateFakeProduct = () => {
  const c = new chance();
  return {
    productId: c.string({ length: 10, alpha: true, numeric: true }),
    name: c.word(),
    price: c.floating({ min: 0, max: 100, fixed: 2 }),
    description: c.paragraph(),
  };
};

const pushProducts = async () => {
  try {
    const mongoURI = 'mongodb+srv://hollanishan:nishanholla@cluster0.17plk7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const products = [];
    for (let i = 0; i < numProducts; i++) {
      products.push(generateFakeProduct());
    }

    await Product.insertMany(products);
    console.log(`${numProducts} fake products inserted!`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
};

pushProducts();
