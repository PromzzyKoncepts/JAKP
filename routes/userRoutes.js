const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/total-participants', userController.getTotalParticipants);
router.patch('/:userId/block', userController.blockUser); // Add this line
router.patch('/:userId/unblock', userController.unblockUser); // Add this line

module.exports = router;