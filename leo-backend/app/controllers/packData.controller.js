const pool = require("../config/database");
const {
  getSimuSettingByProjectId,
  getSimuItemByProjectId,
} = require("./projectSimuConf.controller");
const {
  getPlanesByProjectId,
  getSatelliteByProjectId,
  getIslByProjectId,
  getCplByProjectId,
} = require("./projectConstellation.controller");
const {
  getGroundStationsByProjectId,
} = require("./projectGroundStation.controller");

exports.getProjectDataByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const simuSetting = await getSimuSettingByProjectId(projectId);
    const simuItem = await getSimuItemByProjectId(projectId);
    const planes = await getPlanesByProjectId(projectId);
    const satellites = await getSatelliteByProjectId(projectId);
    const isl = await getIslByProjectId(projectId);
    const cpl = await getCplByProjectId(projectId);
    const groundStations = await getGroundStationsByProjectId(projectId);

    const projectData = {
      simuSetting,
      simuItem,
      planes,
      satellites,
      isl,
      cpl,
      groundStations,
    };

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
