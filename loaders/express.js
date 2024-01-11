const express = require('express');
const cors = require('cors');

module.exports = (app) => {

  // Enable Cross Origin Resource Sharing to all origins by default - to check
  //app.use(cors());

  // Transforms raw string of req.body into JSON
  app.use(express.json());

  // Parses urlencoded bodies
  app.use(express.urlencoded({ extended: true }));

  // To check
  app.set('trust proxy', 1);

  return app;
  
}