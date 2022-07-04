const express = require('express');
const router = express.Router();
const user = require('./user.route');
const video = require('./video.route');
const vote = require('./vote.route');

router.use('/api/user', user);
router.use('/api/video', video);
router.use('/api/vote', vote);

module.exports = router;
