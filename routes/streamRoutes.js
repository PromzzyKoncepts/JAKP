// routes/streamRoutes.js
const express = require('express');
const router = express.Router();
const streamingData = require('../configs/data');

router.get('/streaming-data', (req, res) => {
  res.status(200).json({
    success: true,
    data: streamingData
  });
});

module.exports = router;