const pool = require("../config/database");

const getCharts = async () => {
  const res = await pool.query('SELECT * FROM "Chart"');
  return res.rows;
};

const getChartsByReportId = async (reportId) => {
  const res = await pool.query('SELECT * FROM "Chart" WHERE "reportId" = $1', [
    reportId,
  ]);
  return res.rows;
};

const getReportTitleByReportId = async (reportId) => {
  const res = await pool.query(
    'select "reportName", "simuTime" from "Report" where "reportId" = $1',
    [reportId]
  );
  return res.rows;
};

module.exports = {
  getCharts,
  getChartsByReportId,
  getReportTitleByReportId,
};
