const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController.js');
const { authenticateToken } = require('../controllers/authController');

console.log(authenticateToken)

module.exports = (app) => {
  app.use('/flights', router);
  
  router.post('/', authenticateToken, flightsController.createFlight);
  router.get('/', authenticateToken, flightsController.getAllFlights);
};
