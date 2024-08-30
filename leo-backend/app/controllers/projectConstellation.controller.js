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
         )
         ORDER BY "satelliteId" ASC, "serverIslId" ASC;`,
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

exports.updateIslSettings = async (req, res) => {
  const { projectId } = req.params;
  const satAzimuth1 = req.body.islSettings.satAzimuth1;
  const satAzimuth2 = req.body.islSettings.satAzimuth2;
  const satAzimuth3 = req.body.islSettings.satAzimuth3;
  const satAzimuth4 = req.body.islSettings.satAzimuth4;
  const satElevation = req.body.islSettings.satElevation;
  const laserAzimuth = req.body.islSettings.laserAzimuth;
  const laserElevation = req.body.islSettings.laserElevation;
  const laserRange = req.body.islSettings.laserRange;

  try {
    // Step 1: Get all constellationId by projectId
    const constellationResult = await pool.query(
      `SELECT "constellationId" FROM "Constellation" WHERE "projectId" = $1`,
      [projectId]
    );

    const constellationIds = constellationResult.rows.map(
      (row) => row.constellationId
    );

    if (constellationIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No constellations found for the given projectId." });
    }

    // Step 2: Get all planeId by constellationId
    const planeResult = await pool.query(
      `SELECT "planeId" FROM "Plane" WHERE "constellationId" = ANY($1::int[])`,
      [constellationIds]
    );

    const planeIds = planeResult.rows.map((row) => row.planeId);

    if (planeIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No planes found for the given constellationIds." });
    }

    // Step 3: Get all satelliteId by planeId
    const satelliteResult = await pool.query(
      `SELECT "satelliteId" FROM "Satellite" WHERE "planeId" = ANY($1::int[])`,
      [planeIds]
    );

    const satelliteIds = satelliteResult.rows.map((row) => row.satelliteId);

    if (satelliteIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No satellites found for the given planeIds." });
    }

    // Step 4: Update ISL table for all related satellites
    const updateResult = await pool.query(
      `UPDATE "ISL"
       SET "satAzimuth" = CASE
             WHEN "serverIslId" = 1 THEN $1
             WHEN "serverIslId" = 2 THEN $2
             WHEN "serverIslId" = 3 THEN $3
             WHEN "serverIslId" = 4 THEN $4
             ELSE "satAzimuth"
           END,
           "satElevation" = $5,
           "laserAzimuth" = $6,
           "laserElevation" = $7,
           "laserRange" = $8
       WHERE "satelliteId" = ANY($9::int[])`,
      [
        satAzimuth1,
        satAzimuth2,
        satAzimuth3,
        satAzimuth4,
        satElevation,
        laserAzimuth,
        laserElevation,
        laserRange,
        satelliteIds,
      ]
    );

    res.status(200).json({
      message: `${updateResult.rowCount} ISL records updated successfully.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCplSettings = async (req, res) => {
  const { projectId } = req.params;
  const {
    AccessViewAngle,
    AccessBeamAngle,
    AccessBeamCount,
    AccessBandwidth,
    AccessBeamBandwidth,
    FeederViewAngle,
    FeederBeamAngle,
    FeederBeamCount,
    FeederBandwidth,
    FeederBeamBandwidth,
  } = req.body.cplSettings;

  try {
    // Step 1: Get all constellationIds by projectId
    const constellationResult = await pool.query(
      `SELECT "constellationId" FROM "Constellation" WHERE "projectId" = $1`,
      [projectId]
    );

    const constellationIds = constellationResult.rows.map(
      (row) => row.constellationId
    );

    if (constellationIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No constellations found for the given projectId." });
    }

    // Step 2: Get all planeIds by constellationId
    const planeResult = await pool.query(
      `SELECT "planeId" FROM "Plane" WHERE "constellationId" = ANY($1::int[])`,
      [constellationIds]
    );

    const planeIds = planeResult.rows.map((row) => row.planeId);

    if (planeIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No planes found for the given constellationIds." });
    }

    // Step 3: Get all satelliteIds by planeId
    const satelliteResult = await pool.query(
      `SELECT "satelliteId" FROM "Satellite" WHERE "planeId" = ANY($1::int[])`,
      [planeIds]
    );

    const satelliteIds = satelliteResult.rows.map((row) => row.satelliteId);

    if (satelliteIds.length === 0) {
      return res
        .status(404)
        .json({ error: "No satellites found for the given planeIds." });
    }

    // Step 4: Delete existing CPL entries for found satelliteIds
    await pool.query(`DELETE FROM "CPL" WHERE "satelliteId" = ANY($1::int[])`, [
      satelliteIds,
    ]);

    // Step 5: Insert new CPL entries and create Beam entries
    const cplInsertionQueries = satelliteIds.map(async (satelliteId) => {
      const cplResult = await pool.query(
        `INSERT INTO "CPL" ("satelliteId", 
        "AccessViewAngle" ,  "AccessBeamAngle" ,  "AccessBeamCount",  "AccessBandwidth" ,  
        "FeederViewAngle" ,  "FeederBeamAngle" ,  "FeederBeamCount" ,  "FeederBandwidth" )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "cplId"`,
        [
          satelliteId,
          AccessViewAngle,
          AccessBeamAngle,
          AccessBeamCount,
          AccessBandwidth,
          FeederViewAngle,
          FeederBeamAngle,
          FeederBeamCount,
          FeederBandwidth,
        ]
      );

      const cplId = cplResult.rows[0].cplId;

      await pool.query(
        `INSERT INTO "Beam" ("cplId", "bandwidth")
         VALUES ($1, $2)`,
        [cplId, AccessBeamBandwidth + FeederBeamBandwidth]
      );
    });

    await Promise.all(cplInsertionQueries);

    res
      .status(200)
      .json({ message: `CPL and Beam records updated successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
