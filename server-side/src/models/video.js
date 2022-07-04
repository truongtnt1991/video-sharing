const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const getYouTubeID = require('get-youtube-id');

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  youtubeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  embedUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const setYoutubeInfoByUrl = async function (video) {
  if (video.changed('url')) {
    video.youtubeId = getYouTubeID(video.url);
    video.embedUrl = `https://www.youtube.com/embed/${video.youtubeId}`;
  }
};

Video.beforeCreate(setYoutubeInfoByUrl);
Video.beforeUpdate(setYoutubeInfoByUrl);

module.exports = Video;
