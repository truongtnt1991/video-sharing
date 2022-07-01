/* eslint-disable no-throw-literal */
const VideoService = {};
const Video = require('../../models/video');

VideoService.getAll = async () => {
  return await Video.findAll();
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
