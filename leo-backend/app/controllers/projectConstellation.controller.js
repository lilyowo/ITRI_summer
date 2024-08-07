const pool = require("../config/database");

exports.getPlanesByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM "Plane"
         WHERE "constellationId" IN (
           SELECT "constellationId" FROM "Constellation"
           WHERE "projectId" = $1
         );`,
      [projectId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSatelliteByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM "Satellite"
         WHERE "planeId" IN (
           SELECT "planeId" FROM "Plane"
           WHERE "constellationId" IN (
             SELECT "constellationId" FROM "Constellation"
             WHERE "projectId" = $1
           )
         );`,
      [projectId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIslByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM "ISL"
         WHERE "satelliteId" IN (
           SELECT "satelliteId" FROM "Satellite"
           WHERE "planeId" IN (
             SELECT "planeId" FROM "Plane"
             WHERE "constellationId" IN (
               SELECT "constellationId" FROM "Constellation"
               WHERE "projectId" = $1
             )
           )
         );`,
      [projectId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCplByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM "CPL"
         WHERE "satelliteId" IN (
           SELECT "satelliteId" FROM "Satellite"
           WHERE "planeId" IN (
             SELECT "planeId" FROM "Plane"
             WHERE "constellationId" IN (
               SELECT "constellationId" FROM "Constellation"
               WHERE "projectId" = $1
             )
           )
         );`,
      [projectId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
