const { getCharts, getChartsByReportId, getReportTitleByReportId } = require('../models/chart.model');

const getAllCharts = async (req, res) => {
    try {
        const charts = await getCharts();
        res.json(charts);
    } catch (error) {
        console.error('Error retrieving charts by report:', error);
        res.status(500).json({ error: 'Error retrieving charts' });
    }
};

const getChartsByReport = async (req, res) => {
    const reportId = req.params.reportId;
    try {
        const charts = await getChartsByReportId(reportId);
        res.json(charts);
    } catch (error) {
        console.error('Error retrieving charts by report:', error);
        res.status(500).json({ error: 'Error retrieving charts' });
    }
};

const getReportTitleByReport = async (req, res) => {
    const reportId = req.params.reportId;
    try {
        const report = await getReportTitleByReportId(reportId);
        res.json(report);
    } catch (error) {
        console.error('Error retrieving charts by report:', error);
        res.status(500).json({ error: 'Error retrieving report' });
    }
};

module.exports = {
    getAllCharts,
    getChartsByReport,
    getReportTitleByReport,
};
