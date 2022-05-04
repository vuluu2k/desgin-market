const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// [User & Admin] CREATE COMMENT
router.post('/',CommentController.createComment)
// [User & Admin] GET COMMENT
router.get('/:slug',CommentController.getComment)
// [User & Admin] DELETE COMMENT
router.delete('/:id',CommentController.deleteComment);
module.exports = router;


