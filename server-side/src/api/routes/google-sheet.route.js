const express = require('express');
const router = express.Router();

const googleSheetController = require('../controller/google-sheet.controller');

router
  .route('/getSpreadsheetsById')
  .get(googleSheetController.getSpreadsheetsById);

module.exports = router;
