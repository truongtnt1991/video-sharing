const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controller/comment.controller');
router
  .route('/addComment')
  .post(
    passport.authenticate('jwt', { session: false }),
    commentController.addComment
  );
router
  .route('/getAllCommentsById')
  .get(
    passport.authenticate('jwt', { session: false }),
    commentController.getCommentsByVideoId
  );

module.exports = router;
