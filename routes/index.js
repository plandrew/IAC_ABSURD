const authRouter = require('./auth');
const flightsRouter = require('./flights');

module.exports = (app, passport) => {
  authRouter(app, passport);
  flightsRouter(app);
};
