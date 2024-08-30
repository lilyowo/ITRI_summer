const express = require("express");
const router = express.Router();
const { sendTaskToBroker } = require("../services/task.service");
const taskController = require("../controllers/task.controller");

router.post("/tle/:projectId", taskController.processTleData);
router.post("/isl/:projectId", taskController.makeIslLink);

router.post("/addGroundStation/:projectId", taskController.addGroundStation);
router.post(
  "/modifyGroundStation/:projectId",
  taskController.modifyGroundStation
);
router.post("/deleteGroundStation/:gsId", taskController.deleteGroundStation);
router.post("/setCplConfig/:projectId", taskController.setCplConfig);
router.post("/setSimuConfig/:projectId", taskController.setSimuConfig);
router.post(
  "/makeSimulationResult/:projectId",
  taskController.makeSimulationResult
);

router.post("/task", async (req, res) => {
  try {
    const result = await sendTaskToBroker(req.body, "task");
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/task2", async (req, res) => {
  try {
    const result = await sendTaskToBroker(req.body, "special_task");
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
