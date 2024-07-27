// app/routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");

router.get("/user/:userId", projectController.getProjectsByUserId);
router.get("/report/:projectId", projectController.getReportsByProjectId);
router.delete("/delete/:projectId", projectController.deleteProjectById);
router.post("/", projectController.addProject);
router.get("/search/user/:userId", projectController.searchProjects);

module.exports = router;
