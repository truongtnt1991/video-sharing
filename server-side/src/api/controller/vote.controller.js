const voteService = require('../services/vote.service');

const VoteController = {};

VoteController.like = async (req, res) => {
  const { videoId } = req.body;
  const total = await voteService
    .like(videoId, req.user.dataValues.id)
    .catch((error) => {
      res.status(500).json({ error });
    });
  if (total) {
    res.status(200).json({ total });
  }
};

VoteController.dislike = async (req, res) => {
  const { videoId } = req.body;
  const total = await voteService
    .dislike(videoId, req.user.dataValues.id)
    .catch((error) => {
      res.status(500).json({ error });
    });
  if (total) {
    res.status(200).json({ total });
  }
};

module.exports = VoteController;
