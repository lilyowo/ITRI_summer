const pool = require("../config/database");
const { createCsv } = require("../utils/export.utils");
const fs = require("fs");
const path = require("path");
const {
  getProjectDataByProjectId,
} = require("../controllers/packData.controller");

exports.updateConstellationSettings = async (req, res) => {
  const { projectId, reportId } = req.body;

  try {
    // 檢查 reportId 是否存在
    const reportCheckResult = await pool.query(
      `SELECT * FROM "Report" WHERE "reportId" = $1`,
      [reportId]
    );
    if (reportCheckResult.rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    // 取得打包的 project data
    const projectData = await getProjectDataByProjectId(projectId);

    // 更新 Report 表的 constellationSettings
    await pool.query(
      `UPDATE "Report" SET "constellationSettings" = $1 WHERE "reportId" = $2`,
      [projectData, reportId]
    );

    res
      .status(200)
      .json({ message: "Constellation settings updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
};

exports.exportConstellationSettingsAsCsv = async (req, res) => {
  const { reportId } = req.params;

  try {
    // 檢查 reportId 是否存在
    const reportCheckResult = await pool.query(
      `SELECT * FROM "Report" WHERE "reportId" = $1`,
      [reportId]
    );

    let constellationSettings = [];

    if (reportCheckResult.rows.length > 0) {
      // 取出 constellationSettings
      const constellationSettingsResult = await pool.query(
        `SELECT "constellationSettings" FROM "Report" WHERE "reportId" = $1`,
        [reportId]
      );
      // 如果找不到 constellationSettings 或是空的，設為空的 JSON
      constellationSettings =
        constellationSettingsResult.rows[0]?.constellationSettings || [];
    }

    // 轉換為 CSV
    const fields = Object.keys(constellationSettings[0] || {});
    const csv = await createCsv(constellationSettings, "constellationSettings");
    const filePath = path.join(
      __dirname,
      "../temp",
      "constellationSettings.csv"
    );
    fs.writeFileSync(filePath, csv);

    res.download(filePath, "constellationSettings.csv", (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ error: "Error downloading file" });
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
