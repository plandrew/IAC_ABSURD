const flightsService = require('../services/fligthsService.js');

const flightsController = {
    async createFlight(req, res) {
        try {
            const { flightData } = req.body;
            const githubid = req.user.githubid;
            const newFlight = await flightsService.createFlight(flightData, githubid);
            res.status(201).json(newFlight);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async getAllFlights(req, res) {
        try {
            const githubid = req.user.githubid;
            const flights = await flightsService.getAllFlights(githubid);
            res.status(200).json(flights);
        } catch (err) {
            if (error.message === 'No flights found') {
                res.status(404).json({ message: 'No flights found' });
            } else {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        }
    }
};

module.exports = flightsController;
