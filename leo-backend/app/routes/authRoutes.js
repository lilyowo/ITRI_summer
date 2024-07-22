const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const loginHistoryController = require("../controllers/loginHistory.controller");

router.post("/login", authController.login);
router.post("/loginHistory", loginHistoryController.recordLogin);

module.exports = router;
