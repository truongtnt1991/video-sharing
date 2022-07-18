const commentService = require('../services/comment.service');

const CommentController = {};
CommentController.addComment = async (req, res) => {
  const userId = req.user.dataValues.id;
  const { videoId, content } = req.body;
  if (!videoId || !content) {
    return res.status(400).json({ message: 'VideoId, Content is required!' });
  }

  const comment = await commentService
    .addComment(videoId, userId, content)
    .catch((error) => {
      res.status(500).json({ error });
    });

  if (comment) {
    res.status(200).json({ message: 'Thanks for sharing your comment' });
  }
};

CommentController.getCommentsByVideoId = async (req, res) => {
  const { videoId } = req.query;
  console.log(videoId);
  const comments = await commentService
    .getCommentsByVideoId(videoId)
    .catch((error) => {
      res.status(500).json({ error });
    });
  if (comments) {
    res.status(200).json({ comments });
  }
};

module.exports = CommentController;
