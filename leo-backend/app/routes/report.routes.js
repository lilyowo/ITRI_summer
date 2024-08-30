const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

router.post("/updateSettings", reportController.updateConstellationSettings);
router.get(
  "exportSettings/:reportId",
  reportController.exportConstellationSettingsAsCsv
);

module.exports = router;
