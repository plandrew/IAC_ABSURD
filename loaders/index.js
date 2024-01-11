require('dotenv').config();
const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
const swaggerLoader = require('./swagger');

module.exports = async (app) => {
  // Load Express middlewares
  await expressLoader(app);

  // Load Passport middleware
  const passport = await passportLoader(app);

  // Load API route handlers
  await routeLoader(app, passport);

  // Load Swagger
  await swaggerLoader(app);
  
  // Error Handler
  app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging
  
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
  
    return res.status(status).json({ message });
  });
  
};
