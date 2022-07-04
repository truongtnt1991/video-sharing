const User = require('../models/user');
const Video = require('../models/video');
const Vote = require('../models/vote');
User.hasMany(Video);
Video.belongsTo(User);
Video.hasMany(Vote);
