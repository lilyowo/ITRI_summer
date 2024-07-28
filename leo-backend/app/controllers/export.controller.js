const { getChartsByReportId, getReportTitleByReportId } = require('../models/chart.model');
const { createPdf, createWord, createCsv } = require('../utils/export.utils');
const fs = require('fs');
const path = require('path');

const exportReport = async (req, res) => {
    const reportId = req.params.reportId;
    const format = req.params.format;

    try {
        const charts = await getChartsByReportId(reportId);
        const reportTitle = await getReportTitleByReportId(reportId);
        
        if (!reportTitle || reportTitle.length === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }

        const reportName = reportTitle[0].reportName;
        const simuTime = reportTitle[0].simuTime;
        const fileName = `${reportName}_${simuTime}`;

        let filePath;
        switch (format) {
            case 'pdf':
                filePath = await createPdf(charts, fileName);
                break;
            case 'word':
                filePath = await createWord(charts, fileName);
                break;
            case 'csv':
                filePath = await createCsv(charts, fileName);
                break;
            default:
                return res.status(400).json({ error: 'Invalid format' });
        }

        res.download(filePath, `${fileName}.${format}`, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).json({ error: 'Error downloading file' });
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        });
    } catch (error) {
        console.error('Error exporting report:', error);
        res.status(500).json({ error: 'Error exporting report' });
    }
};

module.exports = {
    exportReport,
};
