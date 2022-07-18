/* eslint-disable no-throw-literal */
const CommentService = {};
const Comment = require('../../models/comment');

CommentService.addComment = async (videoId, userId, content) => {
  return await new Comment({
    videoId,
    userId,
    content,
  }).save();
};

CommentService.getCommentsByVideoId = async (videoId) => {
  return await Comment.findAll({
    where: {
      videoId,
    },
  });
};

module.exports = CommentService;
