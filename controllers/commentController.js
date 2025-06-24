const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const User = require('../models/User');

const getInitials = (name) => {
  if (!name) return 'AN';
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

exports.addComment = async (req, res) => {
  try {
    const { text, email, fullName } = req.body;
    
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        fullName: fullName || 'Anonymous',
        email,
        participantsCount: 1
      });
      await user.save();
    }

    const comment = new Comment({
      user: user._id,
      text,
      initials: getInitials(user.fullName)
    });
    
    await comment.save();
    
    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'fullName email')
      .lean();
    
    // Convert to plain object and add initials if not present
    const commentData = {
      ...populatedComment,
      initials: populatedComment.initials || getInitials(populatedComment.user?.fullName)
    };

    res.status(201).json({
      success: true,
      data: commentData
    });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 })
      .lean();
    
    // Ensure all comments have initials
    const commentsWithInitials = comments.map(comment => ({
      ...comment,
      initials: comment.initials || getInitials(comment.user?.fullName)
    }));

    res.status(200).json({
      success: true,
      data: commentsWithInitials
    });
  } catch (err) {
    console.error('Error getting comments:', err);
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};