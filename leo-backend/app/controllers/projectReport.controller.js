const pool = require("../config/database");

exports.getReportsByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await pool.query(
      'SELECT "reportId", "reportName", "simuTime" FROM "Report" WHERE "projectId" = $1',
      [projectId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecentReportByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT r."reportId", r."reportName"
         FROM "Report" r
         INNER JOIN "Project" p ON r."projectId" = p."projectId"
         WHERE p."userId" = $1
         ORDER BY r."simuTime" DESC
         LIMIT 1`,
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No reports found for this user" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
