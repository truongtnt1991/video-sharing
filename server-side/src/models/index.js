const User = require('../models/user');
const Video = require('../models/video');
User.hasMany(Video);
Video.belongsTo(User);
