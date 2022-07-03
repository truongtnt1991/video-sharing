/* eslint-disable no-throw-literal */
const VideoService = {};
const Video = require('../../models/video');
const youtube = require('./google.service');
const getYouTubeID = require('get-youtube-id');

VideoService.getAll = async () => {
  let videos = await Video.findAll();
  const ids = videos.map((x) => getYouTubeID(x.url));
  const videoInfos = await youtube.getYoutubeByIds(ids.join(','));
  videos = videos.map((x) => {
    return {
      ...x.dataValues,
      youtubeId: getYouTubeID(x.url),
    };
  });

  videos.forEach((item) => {
    const snippetItem = videoInfos.data.items.find(
      (x) => x.id === item.youtubeId
    );
    console.log(snippetItem);
    if (snippetItem) {
      item.videoInfos = snippetItem.snippet;
    }
  });
  return videos;
};

VideoService.getVideosByUserId = async (userId) => {
  let videos = await Video.findAll({ where: { userId } });
  const ids = videos.map((x) => getYouTubeID(x.url));
  const videoInfos = await youtube.getYoutubeByIds(ids.join(','));
  videos = videos.map((x) => {
    return {
      ...x.dataValues,
      youtubeId: getYouTubeID(x.url),
    };
  });

  videos.forEach((item) => {
    const snippetItem = videoInfos.data.items.find(
      (x) => x.id === item.youtubeId
    );
    if (snippetItem) {
      item.videoInfos = snippetItem.snippet;
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

  return await new Video({ userId, url }).save();
};

module.exports = VideoService;
