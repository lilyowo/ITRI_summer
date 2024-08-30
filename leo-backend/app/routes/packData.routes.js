const express = require("express");
const router = express.Router();
const packDataController = require("../controllers/packData.controller");

router.get("/:projectId", packDataController.getProjectDataByProjectId);

module.exports = router;
