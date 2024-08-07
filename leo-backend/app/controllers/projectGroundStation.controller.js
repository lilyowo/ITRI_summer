const pool = require("../config/database");
exports.getGroundStationsByProjectId = async (req, res) => {
  const { projectId, type } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM "GroundStation"
         WHERE "cellId" IN (
           SELECT "cellId" FROM "Cell"
           WHERE "constellationId" IN (
             SELECT "constellationId" FROM "Constellation"
             WHERE "projectId" = $1
           )
         )
         AND "type" = $2;`,
      [projectId, type]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGroundStation = async (req, res) => {
  const { gsId, type } = req.params;
  const { longitude, latitude, altitude, acceptElevation } = req.body;

  // 檢查輸入值是否為數字
  if (
    (longitude && isNaN(longitude)) ||
    (latitude && isNaN(latitude)) ||
    (altitude && isNaN(altitude)) ||
    (acceptElevation && isNaN(acceptElevation))
  ) {
    return res.status(400).json({ error: "Values must be numbers" });
  }

  try {
    const updateFields = {};
    if (longitude !== undefined) updateFields.longitude = longitude;
    if (latitude !== undefined) updateFields.latitude = latitude;
    if (altitude !== undefined) updateFields.altitude = altitude;
    if (acceptElevation !== undefined)
      updateFields.acceptElevation = acceptElevation;

    const setClause = Object.keys(updateFields)
      .map((field, idx) => `"${field}" = $${idx + 1}`)
      .join(", ");

    const values = Object.values(updateFields);

    const query = `UPDATE "GroundStation" SET ${setClause} WHERE "gsId" = $${values.length + 1} AND "type" = $${values.length + 2}`;

    await pool.query(query, [...values, gsId, type]);

    res.status(200).json({ message: "GroundStation updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.insertGroundStation = async (req, res) => {
  const { projectId, longitude, latitude, type } = req.body;

  if (!projectId || !longitude || !latitude || type === undefined) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // 查找是否存在可用的 cellId
    let cellResult = await pool.query(
      `SELECT "cellId" FROM "Cell" WHERE "constellationId" IN (
        SELECT "constellationId" FROM "Constellation" WHERE "projectId" = $1
      ) LIMIT 1`,
      [projectId]
    );

    let cellId;

    if (cellResult.rows.length > 0) {
      cellId = cellResult.rows[0].cellId;
    } else {
      // 如果沒有 cellId，查找或創建 constellationId
      let constellationResult = await pool.query(
        `SELECT "constellationId" FROM "Constellation" WHERE "projectId" = $1 LIMIT 1`,
        [projectId]
      );

      let constellationId;

      if (constellationResult.rows.length > 0) {
        constellationId = constellationResult.rows[0].constellationId;
      } else {
        // 插入新的 Constellation
        let insertConstellationResult = await pool.query(
          `INSERT INTO "Constellation" ("projectId", "constellationName")
           VALUES ($1, $2) RETURNING "constellationId"`,
          [projectId, "Default Constellation"]
        );
        constellationId = insertConstellationResult.rows[0].constellationId;
      }

      // 插入新的 Cell
      let insertCellResult = await pool.query(
        `INSERT INTO "Cell" ("constellationId", "centerLatitude", "centerLongitude", "radius")
         VALUES ($1, $2, $3, $4) RETURNING "cellId"`,
        [constellationId, latitude, longitude, 1000]
      );

      cellId = insertCellResult.rows[0].cellId;
    }

    // 插入新的 GroundStation
    await pool.query(
      `INSERT INTO "GroundStation" ("cellId", "connectedSatId", "type", "latitude", "longitude", "altitude", "acceptElevation")
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [cellId, null, type, latitude, longitude, 0.0, 0.0]
    );

    res.status(201).json({ message: "GroundStation inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
