const { google } = require('googleapis');

const GoogleService = {};

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client,
});

GoogleService.getYoutubeByIds = async (ids) => {
  return await youtube.videos.list({
    part: 'id,snippet',
    id: ids,
  });
};

module.exports = GoogleService;
