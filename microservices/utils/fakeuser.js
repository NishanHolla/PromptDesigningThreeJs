const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model
const chance = require('chance');

const numUsers = 100;

const generateFakeUser = () => {
  const c = new chance();
  return {
    userId: c.string({ length: 8, alpha: true, numeric: true }),
    username: c.name().split(' ').join(''),
    email: c.email(),
    password: c.string({ length: 10 }),
  };
};

const pushUsers = async () => {
  try {
    // Replace with your MongoDB connection URI
    const mongoURI = 'mongodb+srv://hollanishan:nishanholla@cluster0.17plk7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const users = [];
    for (let i = 0; i < numUsers; i++) {
      users.push(generateFakeUser());
    }

    await User.insertMany(users);
    console.log(`${numUsers} fake users with role 'user' inserted!`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
};

pushUsers();
