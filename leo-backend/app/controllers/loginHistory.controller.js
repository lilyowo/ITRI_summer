const LoginHistory = require("../models/loginHistory.model");

const loginHistoryController = {
  recordLogin: async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "userId is required" });
      }
      const result = await LoginHistory.insert(userId);
      res.status(201).json(result);
      // console.log("owo!!!!");
      // console.log(result);
      // console.log("owo!!!!");
    } catch (error) {
      console.error("Error recording login history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = loginHistoryController;
