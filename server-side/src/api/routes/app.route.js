const express = require('express');
const router = express.Router();

const googleSheet = require('./google-sheet.route');

router.use('/api/translation', googleSheet);

module.exports = router;
