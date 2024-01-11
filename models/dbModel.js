require('dotenv').config({ path: '../database/dbConnectionData.env' });
const pool = require('../database/dbConfig');

const createTables = async () => {
  const createFlightsTable = `
    CREATE TABLE IF NOT EXISTS flights (
      id SERIAL PRIMARY KEY,
      departure_airport VARCHAR(255),
      departure_type VARCHAR(255),
      transit_airports TEXT,
      arrival_airport VARCHAR(255),
      arrival_type VARCHAR(255),
      startup_time TIMESTAMP,
      takeoff_time TIMESTAMP,
      landing_time TIMESTAMP,
      shutdown_time TIMESTAMP,
      aircraft_type VARCHAR(50),
      aircraft_model VARCHAR(50),
      aircraft_registration VARCHAR(50),
      formation_name VARCHAR(255),
      crew_function VARCHAR(50),
      pic_name VARCHAR(255),
      landings_day INT,
      landings_night INT,
      night_time INT,
      instrument_time INT,
      nvg_time INT,
      visual_approaches INT,
      nonprecision_approaches INT,
      lpv_approaches INT,
      precision_approaches INT,
      remarks TEXT
    );
  `;

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      githubid INT PRIMARY KEY,
      login VARCHAR(255),
      avatar_url VARCHAR(255),
      gravatar_id VARCHAR(255),
      email VARCHAR(255),
      token VARCHAR(2048)
    );
  `;

  const createUserFlightsTable = `
  CREATE TABLE IF NOT EXISTS user_flights (
    user_id INT,
    flight_id INT,
    PRIMARY KEY (user_id, flight_id),
    FOREIGN KEY (user_id) REFERENCES users(githubId),
    FOREIGN KEY (flight_id) REFERENCES flights(id)
  );
`;

  try {
    await pool.query(createFlightsTable);
    await pool.query(createUsersTable);
    await pool.query(createUserFlightsTable);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

createTables().then(() => pool.end());
