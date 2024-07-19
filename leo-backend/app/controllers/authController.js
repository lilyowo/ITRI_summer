const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretKey } = require("../config/auth");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = result.rows[0];
    // 將 bytea 轉換為字符串
    const storedPassword = Buffer.from(user.password).toString("utf8");
    // const isPasswordValid = await bcrypt.compare(password, storedPassword);
    const isPasswordValid = password == storedPassword;
    console.log("Stored hashed password:", storedPassword);
    console.log("Password:", password);
    console.log(user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user["userId"] }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
