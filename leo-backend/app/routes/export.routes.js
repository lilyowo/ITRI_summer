const express = require('express');
const { exportReport } = require('../controllers/export.controller');
const router = express.Router();

router.get('/:reportId/:format', exportReport);

module.exports = router;
