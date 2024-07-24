const pool = require("../config/database");

exports.getProjectsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM "Project" WHERE "userId" = $1',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.addProject = async (req, res) => {
  const { userId, projectName } = req.body;
  try {
    const checkDuplicate = await pool.query(
      'SELECT 1 FROM "Project" WHERE "userId" = $1 AND "projectName" = $2',
      [userId, projectName]
    );
    if (checkDuplicate.rowCount > 0) {
      return res
        .status(400)
        .json({ error: "Duplicate userId and projectName pair" });
    }
    await pool.query(
      'INSERT INTO "Project" ("userId", "projectName") VALUES ($1, $2)',
      [userId, projectName]
    );
    res.status(201).json({ message: "Project added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
