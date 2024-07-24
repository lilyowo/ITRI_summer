// app/routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");

router.get("/user/:userId", projectController.getProjectsByUserId);
router.get("/report/:projectId", projectController.getReportsByProjectId);
router.post("/", projectController.addProject);

module.exports = router;
