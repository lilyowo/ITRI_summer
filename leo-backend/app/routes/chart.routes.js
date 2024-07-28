const express = require('express');
const { getAllCharts, getChartsByReport, getReportTitleByReport } = require('../controllers/chart.controller');
const router = express.Router();

router.get('/', getAllCharts);
router.get('/:reportId', getChartsByReport);
router.get('/report/:reportId', getReportTitleByReport);

module.exports = router;
