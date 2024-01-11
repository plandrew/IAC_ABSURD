// flightModel.js
const pool = require('../database/dbConfig.js');

class FlightModel {
    async createFlight(flightData, githubid) {
        const {
            departure_airport, departure_type, transit_airports, arrival_airport, 
            arrival_type, startup_time, takeoff_time, landing_time, shutdown_time,
            aircraft_type, aircraft_model, aircraft_registration, formation_name, 
            crew_function, pic_name, landings_day, landings_night, night_time, 
            instrument_time, nvg_time, visual_approaches, nonprecision_approaches, 
            lpv_approaches, precision_approaches
        } = flightData;

        // Start a transaction
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Insert the flight data
            const flightInsertQuery = `
                INSERT INTO flights (departure_airport, departure_type, transit_airports, 
                arrival_airport, arrival_type, startup_time, takeoff_time, landing_time, 
                shutdown_time, aircraft_type, aircraft_model, aircraft_registration, 
                formation_name, crew_function, pic_name, landings_day, landings_night, 
                night_time, instrument_time, nvg_time, visual_approaches, nonprecision_approaches, 
                lpv_approaches, precision_approaches) VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) RETURNING id;
            `;
            const flightValues = [
                departure_airport, departure_type, transit_airports, arrival_airport, arrival_type, 
                startup_time, takeoff_time, landing_time, shutdown_time, aircraft_type, 
                aircraft_model, aircraft_registration, formation_name, crew_function, 
                pic_name, landings_day, landings_night, night_time, instrument_time, 
                nvg_time, visual_approaches, nonprecision_approaches, lpv_approaches, precision_approaches
            ];
            const flightRes = await client.query(flightInsertQuery, flightValues);
            const flightId = flightRes.rows[0].id;

            // Link the flight with the user
            const userFlightInsertQuery = `
                INSERT INTO user_flights (user_id, flight_id) VALUES ($1, $2);
            `;
            await client.query(userFlightInsertQuery, [githubid, flightId]);

            await client.query('COMMIT');

            return flightRes.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async getAllFlights(githubid) {
        const res = await pool.query(
            `SELECT f.* FROM flights f
             INNER JOIN user_flights uf ON f.id = uf.flight_id
             WHERE uf.user_id = $1`,
            [githubid]
        );
    
        // Check if flights are found
        if (res.rows.length === 0) {
            throw new Error('No flights found');
        }
        return res.rows;
    }    
}

module.exports = new FlightModel();
