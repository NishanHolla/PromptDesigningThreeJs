const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const userId = uuidv4(); 

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userId, username, email, password: hashedPassword, role });
    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(200).json({ token, "userId":user.userId, "username":user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.validate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for authorization header and Bearer prefix
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using a strong secret stored securely
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token is not expired
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: 'Token expired' });
    }

    // Access user information from the decoded token (assuming structure)
    const userId = decoded.userId;

    // Fetch user details from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Include user information in the response
    const { username, email } = user;
    res.status(200).json({ username, userId, email });

    // Optionally, you can include user information in the request object
    req.user = { userId, username, email }; // Include desired user fields

    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};



function generateToken(user) {
  const payload = { userId: user._id };
  console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}
