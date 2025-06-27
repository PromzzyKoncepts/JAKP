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

   const getBgColor = () => {
  const kidFriendlyColors = [
    'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 
    'bg-pink-200', 'bg-purple-200', 'bg-indigo-200',
    'bg-teal-200', 'bg-orange-200', 'bg-cyan-200',
    'bg-amber-200', 'bg-lime-200', 'bg-emerald-200'
  ];
  return kidFriendlyColors[Math.floor(Math.random() * kidFriendlyColors.length)];
};
  
  try {
    const { text, email, fullName } = req.body;
    
    let user = await User.findOne({ email });

    // Check if user is blocked
    if (user?.isBlocked) {
      return res.status(403).json({
        success: false,
        error: 'Your account has been blocked from commenting'
      });
    }

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
      color: getBgColor(),
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

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(400).json({
        success: false,
        error: 'Comment ID is required'
      });
    }
    // Check if comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId });

    res.status(200).json({
      success: true,
      data: {
        message: 'Comment deleted successfully'
      }
    });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};