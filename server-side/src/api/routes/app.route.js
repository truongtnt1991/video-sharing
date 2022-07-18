const express = require('express');
const router = express.Router();
const user = require('./user.route');
const video = require('./video.route');
const vote = require('./vote.route');
const comment = require('./comment.route');
const googleSheet = require('./google-sheet.route');

router.use('/api/user', user);
router.use('/api/video', video);
router.use('/api/vote', vote);
router.use('/api/comment', comment);
router.use('/api/google-sheet', googleSheet);

module.exports = router;
