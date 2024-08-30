// app/routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const projectReportController = require("../controllers/projectReport.controller");
const projectGroundStationController = require("../controllers/projectGroundStation.controller");
const projectConstellationController = require("../controllers/projectConstellation.controller");
const projectSimuConfController = require("../controllers/projectSimuConf.controller");

// from project.controller.js
router.get("/user/:userId", projectController.getProjectsByUserId);
router.delete("/delete/:projectId", projectController.deleteProjectById);
router.post("/", projectController.addProject);
router.get("/search/user/:userId", projectController.searchProjects);
router.put("/updateLastEdit/:projectId", projectController.updateLastEditTime);

// from projectReport.controller.js
router.get("/report/:projectId", projectReportController.getReportsByProjectId);
router.get("/recent/:userId", projectReportController.getRecentReportByUserId);

// from projectGroundStation.controller.js
router.get(
  "/groundStations/:projectId/:type",
  projectGroundStationController.getGroundStationsByProjectId
);
router.put(
  "/groundStation/:gsId/:type",
  projectGroundStationController.updateGroundStation
);
router.post(
  "/groundStation",
  projectGroundStationController.insertGroundStation
);
router.delete(
  "/groundStations/:gsId/:type",
  projectGroundStationController.deleteGroundStation
);

// from projectConstellation.controller.js
router.get(
  "/planes/:projectId",
  projectConstellationController.getPlanesByProjectId
);
router.get(
  "/satellites/:projectId",
  projectConstellationController.getSatelliteByProjectId
);
router.get(
  "/isls/:projectId",
  projectConstellationController.getIslByProjectId
);
router.get(
  "/cpls/:projectId",
  projectConstellationController.getCplByProjectId
);
router.put(
  "/islSettings/:projectId",
  projectConstellationController.updateIslSettings
);
router.put(
  "/cplSettings/:projectId",
  projectConstellationController.updateCplSettings
);

// from projectSimuConf.controller.js
router.get(
  "/simuSettings/:projectId",
  projectSimuConfController.getSimuSettingByProjectId
);
router.get(
  "/simuItems/:projectId",
  projectSimuConfController.getSimuItemByProjectId
);
router.put(
  "/simuSettings/:projectId",
  projectSimuConfController.updateSimuSettingsByProjectId
);
router.put(
  "/simuItems/:projectId",
  projectSimuConfController.updateSimuItemsByProjectId
);
router.post(
  "/initializeSimulationConf/:projectId",
  projectSimuConfController.initializeSimulationConf
);

module.exports = router;
