require('dotenv').config({ path: './database/dbConnectionData.env' });
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: process.env.DB_POOL_MAX,
    idleTimeoutMillis: process.env.DB_POOL_IDLE_TIMEOUT,
    connectionTimeoutMillis: process.env.DB_POOL_CONNECTION_TIMEOUT,
});

module.exports = pool, {
    query: (text, params) => pool.query(text, params)
  }