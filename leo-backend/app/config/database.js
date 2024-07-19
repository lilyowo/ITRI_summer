const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '140.96.106.221',
  database: 'StarDB',
  password: '@@Hamster',
  port: 5432,
});

module.exports = pool;