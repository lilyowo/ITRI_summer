const { Pool } = require("pg");

const pool = new Pool({
  user: "Hamster",
  host: "localhost",
  database: "StarDB",
  password: "hpassword",
  port: 5432,
});

module.exports = pool;
