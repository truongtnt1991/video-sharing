/* eslint-disable no-throw-literal */
const VoteService = {};
const Vote = require('../../models/vote');
const LIKE = 'LIKE';
const DISLIKE = 'DISLIKE';

VoteService.like = async (videoId, userId) => {
  const vote = await Vote.findOne({
    where: { videoId, userId, type: LIKE },
  });
  if (vote) {
    return await vote.destroy();
  } else {
    return await new Vote({
      videoId,
      userId,
      type: LIKE,
    }).save();
  }
};

VoteService.dislike = async (videoId, userId) => {
  const vote = await Vote.findOne({
    where: { videoId, userId, type: DISLIKE },
  });
  if (vote) {
    return await vote.destroy();
  } else {
    return await new Vote({
      videoId,
      userId,
      type: DISLIKE,
    }).save();
  }
};

module.exports = VoteService;
