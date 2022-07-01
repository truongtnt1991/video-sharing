const videoService = require('../services/video.service');

const VideoController = {};
VideoController.share = async (req, res) => {
  const { userId, url } = req.body;
  if (!userId || !url) {
    return res.status(400).json({ message: 'UserId, Url is required!' });
  }
  const video = await videoService.share(userId, url).catch((error) => {
    res.status(500).json({ error });
  });

  if (video) {
    res.status(200).json({ message: 'Thanks for sharing' });
  }
};

VideoController.getAll = async (req, res) => {
  const videos = await videoService.getAll().catch((error) => {
    res.status(500).json({ error });
  });
  res.status(200).json({ videos });
};

module.exports = VideoController;
