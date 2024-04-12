const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const mongoose = require('mongoose');


async function addAdmin(username, email, password) {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust cost factor as needed

    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      role: 'admin', // Set role to 'admin'
    });

    await newAdmin.save();
    console.log(`Admin user '${username}' created successfully!`);
  } catch (err) {
    console.error('Error adding admin:', err.message);
  }
}


addAdmin('nishan', 'nishan@gmail.com', 'admin')
  .then(() => console.log('Admin creation completed.'))
  .catch(err => console.error('Unhandled error:', err));
