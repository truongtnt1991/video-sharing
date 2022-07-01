const express = require('express');
const router = express.Router();
const user = require('./user.route');
const video = require('./video.route');

router.use('/api/user', user);
router.use('/api/video', video);

module.exports = router;
