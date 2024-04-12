const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    // Get user ID from request (assuming it's set in authentication middleware)
    const userId = req.user.userId;
    
    // Fetch user profile from database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user profile as response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    // Get user ID from request (assuming it's set in authentication middleware)
    const userId = req.user.userId;

    // Update user profile in database
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send updated user profile as response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
