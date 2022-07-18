const GoogleSheetService = require('../services/google-sheet.service');

const GoogleSheetController = {};
GoogleSheetController.getSpreadsheetsById = async (req, res) => {
  const { sheetId, sheetName } = req.query;
  if (!sheetId || !sheetName) {
    return res
      .status(400)
      .json({ message: 'Spreadsheet Id and Sheet name is required!' });
  }

  const sheet = await GoogleSheetService.getSpreadsheetsById(
    sheetId,
    sheetName
  ).catch((error) => {
    res.status(500).json({ error });
  });

  res.status(200).json(sheet.data.values);
};

module.exports = GoogleSheetController;
