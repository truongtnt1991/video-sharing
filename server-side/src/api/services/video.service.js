/* eslint-disable no-throw-literal */
const VideoService = {};
const Video = require('../../models/video');
const youtube = require('./google.service');
const getYouTubeID = require('get-youtube-id');
const User = require('../../models/user');
const Vote = require('../../models/vote');

VideoService.getAll = async () => {
  const videos = await Video.findAll({
    include: [
      { model: User, attributes: ['id', 'fullName'] },
      { model: Vote, attributes: ['id', 'type', 'userId'] },
    ],
    order: [['id', 'DESC']],
  });
  return VideoService.getVideo(videos);
};

VideoService.getVideosByUserId = async (userId) => {
  const videos = await Video.findAll({
    where: { userId },
    include: [
      { model: User, attributes: ['id', 'fullName'] },
      { model: Vote, attributes: ['id', 'type', 'userId'] },
    ],
    order: [['id', 'DESC']],
  });
  return VideoService.getVideo(videos);
};

VideoService.getVideo = async (videos) => {
  const ids = videos.map((x) => getYouTubeID(x.url));
  const videoInfos = await youtube.getYoutubeByIds(ids.join(','));

  videos.forEach(async (item) => {
    const snippetItem = videoInfos.data.items.find(
      (x) => x.id === item.youtubeId
    );
    if (snippetItem) {
      item.dataValues.videoInfo = snippetItem.snippet;
    }
  });
  return videos;
};

VideoService.share = async (userId, url) => {
  const alreadyExistsVideo = await Video.findOne({
    where: { url },
  });

  if (alreadyExistsVideo) {
    throw `Url ${url} is already shared`;
  }

  return await new Video({
    userId,
    url,
    youtubeId: '',
    embedUrl: '',
  }).save();
};

module.exports = VideoService;
