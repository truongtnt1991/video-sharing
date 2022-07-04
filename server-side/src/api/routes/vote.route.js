const express = require('express');
const router = express.Router();
const passport = require('passport');

const voteController = require('../controller/vote.controller');
router
  .route('/like')
  .post(passport.authenticate('jwt', { session: false }), voteController.like);
router
  .route('/dislike')
  .post(
    passport.authenticate('jwt', { session: false }),
    voteController.dislike
  );

module.exports = router;
