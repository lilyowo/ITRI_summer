const pool = require("../config/database");
const { sendTaskToBroker } = require("../services/task.service");

const processTleData = async (req, res) => {
  const { projectId } = req.params;
  const client = await pool.connect();
  try {
    const buffer = Buffer.from(req.body.tle.split(",")[1], "base64");
    const tleContent = buffer.toString("utf-8");
    const param = { tleString: tleContent };
    const result = await sendTaskToBroker(param, "getConstellation");
    // 檢查 result 中是否有錯誤訊息
    if (result[0].error) {
      console.error("Error from broker:", result.error);
      return res.status(500).json({ error: result.error });
    }
    await client.query("BEGIN");
    Planes = result[0].Planes;

    const constellationId = await getConstellationId(client, projectId);
    console.log(`New Constellation created with id: ${constellationId}`);

    // Insert into Plane table
    const planeInsertQuery = `
        INSERT INTO "Plane" ("constellationId", "serverPlaneId", "inclination", "raan", "eccentricity","arg_pe", "altitude")
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "planeId";
        `;
    for (plane of Planes) {
      const planeValues = [
        constellationId,
        plane.planeId,
        plane.inclination,
        plane.raan,
        plane.eccentricity,
        plane.arg_pe,
        plane.altitude,
      ];
      const planeResult = await client.query(planeInsertQuery, planeValues);
      const planeId = planeResult.rows[0].planeId;
      console.log("planeId:", planeId);

      // Insert into Satellite table
      const satelliteInsertQuery = `
      INSERT INTO "Satellite" ("planeId", "serverSatId", "latitude", "longitude", "altitude", "meanAnomaly", "meanMotion", "mass", "serverPlaneId")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "satelliteId";
      `;
      for (let satellite of plane.Satellites) {
        const satelliteValues = [
          planeId,
          satellite.satelliteId,
          satellite.latitude,
          satellite.longitude,
          satellite.altitude,
          satellite.meanAnomaly,
          satellite.meanMotion,
          Math.floor(Math.random() * (800 - 500 + 1)) + 500,
          plane.planeId,
        ];
        const satelliteResult = await client.query(
          satelliteInsertQuery,
          satelliteValues
        );
        const satelliteId = satelliteResult.rows[0].satelliteId;
        // console.log("satelliteId:", satelliteId);
      }
    }

    await client.query("COMMIT");
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error during TLE processing:", error);
    await client.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  } finally {
    client.release();
  }
};

const makeIslLink = async (req, res) => {
  const { projectId } = req.params;
  const client = await pool.connect();
  try {
    param = { islConfig: req.body.islSettings };
    await client.query("BEGIN");

    // 發送任務到 broker
    const result = await sendTaskToBroker(param, "setIslConfig");
    // console.log("result:", result);
    const connectSatPairs = result[0];

    // 獲取 satelliteIds
    const satelliteIds = await getSatelliteIds(client, projectId);

    for (let pair of connectSatPairs) {
      const [serverSatId1, serverSatId2] = pair;

      // 1. 找到 Sat1 和其經度
      const findSat1Query = `
        SELECT "satelliteId", "longitude"
        FROM "Satellite"
        WHERE "serverSatId" = $1 AND "satelliteId" = ANY($2::int[])
      `;
      const sat1Result = await client.query(findSat1Query, [
        serverSatId1,
        satelliteIds,
      ]);
      const sat1 = sat1Result.rows[0];

      // 2. 找到 Sat2 和其經度
      const findSat2Query = `
        SELECT "satelliteId", "longitude"
        FROM "Satellite"
        WHERE "serverSatId" = $1 AND "satelliteId" = ANY($2::int[])
      `;
      const sat2Result = await client.query(findSat2Query, [
        serverSatId2,
        satelliteIds,
      ]);
      const sat2 = sat2Result.rows[0];

      if (sat1 && sat2) {
        // 計算經度差的絕對值
        const longitudeDiff = Math.abs(sat1.longitude - sat2.longitude);

        // 如果經度差小於等於180度，則建立連接
        // if (longitudeDiff <= 180) {
        if (true) {
          // 查詢ISL 數量
          const countISLQuery = `
      SELECT COUNT(*) as count
      FROM "ISL"
      WHERE "satelliteId" = $1
    `;
          const count1Result = await client.query(countISLQuery, [
            sat1.satelliteId,
          ]);
          const count1 = parseInt(count1Result.rows[0].count);

          const count2Result = await client.query(countISLQuery, [
            sat2.satelliteId,
          ]);
          const count2 = parseInt(count2Result.rows[0].count);
          // 3. 為 Sat1 創建 ISL
          const insertISLQuery = `
            INSERT INTO "ISL" ("satelliteId", "serverSatId","serverIslId")
            VALUES ($1, $2, $3)
            RETURNING "islId"
          `;
          const isl1Result = await client.query(insertISLQuery, [
            sat1.satelliteId,
            serverSatId1,
            count1 + 1,
          ]);
          const isl1Id = isl1Result.rows[0].islId;

          // 4. 為 Sat2 創建 ISL
          const isl2Result = await client.query(insertISLQuery, [
            sat2.satelliteId,
            serverSatId2,
            count2 + 1,
          ]);
          const isl2Id = isl2Result.rows[0].islId;

          // 5. 更新 ISL1 和 ISL2 的 connectIslId
          const updateISLQuery = `
            UPDATE "ISL"
            SET "connectIslId" = $1
            WHERE "islId" = $2
          `;
          await client.query(updateISLQuery, [isl2Id, isl1Id]);
          await client.query(updateISLQuery, [isl1Id, isl2Id]);
        }
      }
    }

    await client.query("COMMIT");
    res.status(200).json({ message: "ISL links created successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in makeIslLink:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating ISL links" });
  } finally {
    client.release();
  }
};

//輔助函數來獲取 constellationId
async function getConstellationId(client, projectId) {
  // 找出所有符合條件的 constellation
  let constellationsResult = await client.query(
    'SELECT "constellationId" FROM "Constellation" WHERE "projectId" = $1',
    [projectId]
  );

  // 如果存在符合條件的 constellation，則刪除它們
  if (constellationsResult.rows.length > 0) {
    // console.log("Deleting existing Constellations");
    await client.query('DELETE FROM "Constellation" WHERE "projectId" = $1', [
      projectId,
    ]);
  }

  // 新增一個新的 constellation
  // console.log("Inserting new Constellation");
  const insertResult = await client.query(
    'INSERT INTO "Constellation" ("projectId", "constellationName") VALUES ($1, $2) RETURNING "constellationId"',
    [projectId, `Constellation project ${projectId}`]
  );

  const constellationId = insertResult.rows[0].constellationId;

  return constellationId;
}

// 輔助函數來獲取 satelliteIds
async function getSatelliteIds(client, projectId) {
  const getConstellationIdQuery = `
    SELECT "constellationId" 
    FROM "Constellation"
    WHERE "projectId" = $1;
  `;
  const constellationResult = await client.query(getConstellationIdQuery, [
    projectId,
  ]);
  const constellationIds = constellationResult.rows.map(
    (row) => row.constellationId
  );

  const getPlaneIdQuery = `
    SELECT "planeId" 
    FROM "Plane"
    WHERE "constellationId" = ANY($1::int[]);
  `;
  const planeResult = await client.query(getPlaneIdQuery, [constellationIds]);
  const planeIds = planeResult.rows.map((row) => row.planeId);

  const getSatelliteIdQuery = `
    SELECT "satelliteId" 
    FROM "Satellite"
    WHERE "planeId" = ANY($1::int[]);
  `;
  const satelliteResult = await client.query(getSatelliteIdQuery, [planeIds]);
  return satelliteResult.rows.map((row) => row.satelliteId);
}
const addGroundStation = async (req, res) => {
  const { projectId } = req.params;
  const { gsId, latitude, longitude, type } = req.body.gsInfo;
  // console.log(req.body);
  try {
    const param = {
      latitude,
      longitude,
      type,
      gsId,
    };

    const result = await sendTaskToBroker(param, "addGroundStation");
    const id = result[0].groundStationId;
    // console.log(result);
    res.json({ message: `Add ground station id = ${id}`, gsId });
  } catch (error) {
    console.error("Error adding ground station:", error);
    res.status(500).json({ error: "Failed to add ground station" });
  }
};

const modifyGroundStation = async (req, res) => {
  const { projectId } = req.params;
  // const { gsId, latitude, longitude, altitude, acceptElevation, type } = req.body.gsInfo;

  // console.log(req.body.gsInfo);
  try {
    const param = req.body.gsInfo;

    const result = await sendTaskToBroker(param, "modifyGroundStation");
    res.json({ message: "modify ground station" });
  } catch (error) {
    console.error("Error adding ground station:", error);
    res.status(500).json({ error: "Failed to add ground station" });
  }
};

const deleteGroundStation = async (req, res) => {
  const { gsId } = req.params;
  try {
    const param = { gsId: gsId };

    const result = await sendTaskToBroker(param, "deleteGroundStation");
    res.json({ message: "delete ground station" });
  } catch (error) {
    console.error("Error deleteing ground station:", error);
    res.status(500).json({ error: "Failed to delete ground station" });
  }
};
const setCplConfig = async (req, res) => {
  const { projectId } = req.params;
  // console.log(req.body);
  try {
    const param = req.body;

    const result = await sendTaskToBroker(param, "setCplConfig");
    res.json({ message: "seting cpl config" });
  } catch (error) {
    console.error("Error seting cpl config:", error);
    res.status(500).json({ error: "Failed to set cpl config" });
  }
};

// const setSimuConfig = async (req, res) => {
//   const { projectId } = req.params;
//   try {
//     //先呼叫getSimuSettings、getSimuItems取得simuSettings、simuItems
//     const simuSettings = await pool.query(
//       'SELECT "simuSettings" FROM "SimulationConf" WHERE "projectId" = $1',
//       [projectId]
//     );
//     if (simuSettings.rows.length === 0) {
//       return res.status(404).json({
//         error: "No simulation settings found for the given projectId",
//       });
//     }
//     const simuItems = await pool.query(
//       'SELECT "simuItems" FROM "SimulationConf" WHERE "projectId" = $1',
//       [projectId]
//     );
//     if (simuItems.rows.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No simulation items found for the given projectId" });
//     }
//     //再將它們做成param傳給sendTaskToBroker
//     const param = {
//       simuSettings: simuSettings.rows[0].simuSettings,
//       simuItems: simuItems.rows[0].simuItems,
//     };
//     const result = await sendTaskToBroker(param, "setSimuConfig");
//     res.json({ message: "seting simu config" });
//   } catch (error) {
//     console.error("Error seting simu config:", error);
//     res.status(500).json({ error: "Failed to set simu config" });
//   }
// };
const setSimuConfig = async (req, res) => {
  const { projectId } = req.params;
  try {
    // 取得 simuSettings 和 simuItems
    const simuSettingsResult = await pool.query(
      'SELECT "simuSettings" FROM "SimulationConf" WHERE "projectId" = $1',
      [projectId]
    );
    const simuItemsResult = await pool.query(
      'SELECT "simuItems" FROM "SimulationConf" WHERE "projectId" = $1',
      [projectId]
    );

    if (
      simuSettingsResult.rows.length === 0 ||
      simuItemsResult.rows.length === 0
    ) {
      return res.status(404).json({
        error: "No simulation settings or items found for the given projectId",
      });
    }

    const simuSettings = simuSettingsResult.rows[0].simuSettings;
    const simuItems = simuItemsResult.rows[0].simuItems;

    // 處理 simuSettings
    const processedSettings = {
      handoverStrategy: findEnabledDataTitle(simuSettings["換手規則"]),
      routingStrategy: findEnabledDataTitle(simuSettings["路由規則"]),
      islMethod: findEnabledDataTitle(simuSettings["ISL連線規則"]),
      randomEvent: processRandomEvent(simuSettings["隨機事件規則"]),
    };

    // 處理 simuItems
    const processedItems = {
      constellation: processSimuItem(simuItems["衛星間連線"], [
        "minDistance",
        "avgDistance",
        "maxDistance",
        "angel",
        "elavation",
        "range",
        "aer",
        "intraIslAer",
        "intraIslDistance",
        "interIslDistance",
        "islBreakDistribution",
        "satBreakDistributin",
      ]),
      ground: processSimuItem(simuItems["對地輻射"], [
        "coverage",
        "connectedSatTime",
        "connectedSatCount",
        "connectedSatSignal",
      ]),
      routing: processSimuItem(simuItems["路由效能"], [
        "hopCount",
        "distance",
        "intraIslDistribution",
        "interIslDistribution",
        "islDistribution",
        "rtuCount",
        "packetLoss",
      ]),
      handover: processSimuItem(simuItems["換手效能"], [
        "handoverCount",
        "AverageSatServiceTime",
        "HandoverFailCount",
      ]),
    };

    // 構建最終的參數
    const param = {
      simuSettings: processedSettings,
      simuItems: processedItems,
    };

    // 發送任務到 Broker
    const result = await sendTaskToBroker(param, "setSimuConfig");
    res.json({ message: "Setting simu config", result });
  } catch (error) {
    console.error("Error setting simu config:", error);
    res.status(500).json({ error: "Failed to set simu config" });
  }
};

// 輔助函數
function findEnabledDataTitle(items) {
  const enabledItem = items.find((item) => item.display);
  return enabledItem ? enabledItem.dataTitle : null;
}

function processRandomEvent(randomEvent) {
  return {
    randomSeed: randomEvent.randomSeed,
    satBreak: randomEvent.satLossRate,
    islDisconnect: randomEvent.ISLDisconnectRate,
    islBreak: randomEvent.ISLLossRate,
    cplBreak: randomEvent.CPLLossRate,
    packetLoss: randomEvent.PacketLossRate,
  };
}

function processSimuItem(items, englishTitles) {
  return items
    .filter((item) => item.display)
    .map((item, index) => englishTitles[index])
    .filter(Boolean);
}

const makeSimulationResult = async (req, res) => {
  const { projectId } = req.params;
  try {
    const simuTime = req.body.simuTime;
    const gsIds = await pool.query(
      `SELECT "gsId" FROM "GroundStation"
         WHERE "cellId" IN (
           SELECT "cellId" FROM "Cell"
           WHERE "constellationId" IN (
             SELECT "constellationId" FROM "Constellation"
             WHERE "projectId" = $1
           )
         );`,
      [projectId]
    );
    const gsIdArray = gsIds.rows.map((row) => row.gsId);
    const param = {
      simuTime: simuTime,
      gsIds: gsIdArray,
    };
    const result = await sendTaskToBroker(param, "makeSimulationResult");
    // Step 1: Get simulationConf data
    const simuConfData = await pool.query(
      `SELECT "simuSettings", "simuItems" FROM "SimulationConf"
       WHERE "projectId" = $1;`,
      [projectId]
    );

    // Combine the simulationConf data
    const constellationSettings = {
      simuSettings: simuConfData.rows[0].simuSettings,
      simuItems: simuConfData.rows[0].simuItems,
    };

    // Step 2: Get projectName
    const projectNameRes = await pool.query(
      `SELECT "projectName" FROM "Project" WHERE "projectId" = $1;`,
      [projectId]
    );
    const projectName = projectNameRes.rows[0].projectName;

    // Step 3: Get the current number of reports for this project
    const reportCountRes = await pool.query(
      `SELECT COUNT(*) FROM "Report" WHERE "projectId" = $1;`,
      [projectId]
    );
    const reportCount = parseInt(reportCountRes.rows[0].count, 10);

    // Step 4: Insert a new report
    const reportName = `[Simulation] ${projectName} - ${reportCount + 1}`;
    const currentTime = new Date().toLocaleString("sv-SE", {
      timeZone: "Asia/Taipei",
    });
    const newReportRes = await pool.query(
      `INSERT INTO "Report" ("projectId", "reportName", "constellationSettings", "simuTime")
       VALUES ($1, $2, $3, $4)
       RETURNING "reportId";`,
      [projectId, reportName, constellationSettings, currentTime]
    );
    const reportId = newReportRes.rows[0].reportId;

    // Step 5: Insert reportInfo into Chart table
    const reportInfo = result[0].reportInfo;
    for (let i = 0; i < reportInfo.length; i++) {
      const title = reportInfo[i].dataTitle;
      const description = reportInfo[i].description;
      const dataJson = reportInfo[i].data;
      await pool.query(
        `INSERT INTO "Chart" ("reportId", "dataTitle", "description", "image", "data")
         VALUES ($1, $2, $3, $4, $5);`,
        [reportId, title, description, null, dataJson]
      );
    }
    // Return the reportId and simulationInfo
    res.json({ reportId, simulationInfo: result[0].simulationInfo });
    // res.json(result[0].simulationInfo);
  } catch (error) {
    console.error("Error making simulation result:", error);
    res.status(500).json({ error: "Failed to make simulation result" });
  }
};

module.exports = {
  processTleData,
  makeIslLink,
  addGroundStation,
  modifyGroundStation,
  deleteGroundStation,
  setCplConfig,
  setSimuConfig,
  makeSimulationResult,
};
