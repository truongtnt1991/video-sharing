const videoService = require('../services/video.service');

const VideoController = {};
VideoController.share = async (req, res) => {
  const userId = req.user.dataValues.id;
  const { url } = req.body;
  if (!userId || !url) {
    return res.status(400).json({ message: 'UserId, Url is required!' });
  }
  if (!VideoController.matchYoutubeUrl(url)) {
    return res.status(400).json({ message: 'Url is not YouTube Format' });
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
  if (videos) {
    res.status(200).json({ videos });
  }
};

VideoController.getVideosByUserId = async (req, res) => {
  const videos = await videoService
    .getVideosByUserId(req.user.dataValues.id)
    .catch((error) => {
      res.status(500).json({ error });
    });
  if (videos) {
    res.status(200).json({ videos });
  }
};

VideoController.matchYoutubeUrl = (url) => {
  const p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const matches = url.match(p);
  if (matches) {
    return !!matches[1];
  }
  return false;
};

module.exports = VideoController;
