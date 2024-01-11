require('dotenv').config({ path: './database/dbConnectionData.env' });
const pool = require('../database/dbConfig.js');

describe('Database Environment Variables', () => {
  test('should have set the correct environment variables', () => {
    console.log('DB User:', process.env.DB_USER);

    expect(process.env.DB_USER).toBeDefined();
  });
});

describe('Database Connection', () => {
  afterAll(async () => {
    await pool.end();
  });

  test('should connect to the database successfully', async () => {
    const result = await pool.query('SELECT NOW()');
    expect(result).toBeDefined();
    expect(result.rows[0]).toHaveProperty('now');
  });
});
