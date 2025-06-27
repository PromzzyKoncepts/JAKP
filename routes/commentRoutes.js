const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.addComment);
router.get('/', commentController.getAllComments);
router.delete('/:commentId', commentController.deleteComment);
module.exports = router;