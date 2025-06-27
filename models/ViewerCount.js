const mongoose = require('mongoose');

const viewerCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  
});

module.exports = mongoose.model('ViewerCount', viewerCountSchema);