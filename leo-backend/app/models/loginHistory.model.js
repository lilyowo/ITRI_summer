const pool = require("../config/database");
const LoginHistory = {
  insert: async (userId) => {
    const query =
      'INSERT INTO "LoginHistory" ("userId", "timestamp") VALUES ($1, CURRENT_TIMESTAMP) RETURNING *';
    const values = [userId];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = LoginHistory;
