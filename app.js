require('dotenv').config();
const express = require('express');
const app = express();
const loaders = require('./loaders');
const pool = require('./database/dbConfig.js');
//const flightsRouter = require('./routes/flights');



//app.use(express.json()); // for parsing application/json

// Setup the flights routes
//app.use('/flights', flightsRouter);

// Handle 404 errors
/*
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
*/

async function startServer() {

  //Closing connection with DB if application shutdown or terminate

  process.on('SIGINT', async () => {
    console.log('Closing database pool due to application shutdown');
    await pool.end();
    console.log('Database pool closed');
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('Closing database pool due to application termination');
    await pool.end();
    console.log('Database pool closed');
    process.exit(0);
  });

  // Init application loaders
  loaders(app);

  // Start server
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on PORT ${process.env.PORT}`);
  })
}

startServer();
