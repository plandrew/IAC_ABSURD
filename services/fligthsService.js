// flightsService.js
const FlightModel = require('../models/flightModel');

class FlightsService {
    async createFlight(flightData, githubid) {
        return await FlightModel.createFlight(flightData, githubid);
    }

    async getAllFlights(githubid) {
        return await FlightModel.getAllFlights(githubid);
    }
}

module.exports = new FlightsService();
