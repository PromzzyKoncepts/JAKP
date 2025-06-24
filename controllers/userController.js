const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, participantsCount } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      // Update existing user's participants count
      user.participantsCount = participantsCount;
      await user.save();
    } else {
      // Create new user with participants count
      user = new User({ fullName, email, participantsCount });
      await user.save();
    }
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

exports.getTotalParticipants = async (req, res) => {
  try {
    // Aggregate to sum all participantsCount
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          totalParticipants: { $sum: "$participantsCount" }
        }
      }
    ]);
    
    const totalParticipants = result.length > 0 ? result[0].totalParticipants : 0;
    
    res.status(200).json({
      success: true,
      data: {
        totalParticipants
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};