const { Pool } = require("pg");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./app/config/config.json", "utf8"));
const user = config.user;
const host = config.host;
const database = config.database;
const password = config.password;
const port = config.port;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});

module.exports = pool;
