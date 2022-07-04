const express = require('express');
const router = express.Router();
const passport = require('passport');

const videoController = require('../controller/video.controller');
router
  .route('/share')
  .post(
    passport.authenticate('jwt', { session: false }),
    videoController.share
  );
router.route('/getAll').get(videoController.getAll);
router
  .route('/getVideoShared')
  .get(
    passport.authenticate('jwt', { session: false }),
    videoController.getVideosByUserId
  );

module.exports = router;
