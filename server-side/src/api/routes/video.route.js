const express = require('express');
const router = express.Router();

const videoController = require('../controller/video.controller');

router.route('/share').post(videoController.share);
router.route('/getAll').get(videoController.getAll);
router.route('/getVideosById').get(videoController.getVideosByUserId);

module.exports = router;
