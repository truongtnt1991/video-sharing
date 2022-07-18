const { google } = require('googleapis');

const GoogleSheetService = {};

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_SHEET_CLIENT_ID,
  process.env.GOOGLE_SHEET_CLIENT_SECRET,
  process.env.GOOGLE_SHEET_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_SHEET_REFRESH_TOKEN,
});

const sheets = google.sheets({
  version: 'v4',
  auth: oauth2Client,
});

GoogleSheetService.getSpreadsheetsById = async (id, sheetName) => {
  return await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: `${sheetName}!A2:E`,
  });
};

module.exports = GoogleSheetService;
