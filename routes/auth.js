const express = require('express');
const router = express.Router();
const { handleGitHubCallback } = require('../controllers/authController');

module.exports = (app, passport) => {

  app.use('/auth', router);

  // Route to start the OAuth process and redirect to GitHub
  router.get('/', passport.authenticate('github', { session: false }));

  // GitHub callback route
  router.get('/callback', 
    passport.authenticate('github', { failureRedirect: '/auth', session: false }),
    handleGitHubCallback
  );
};

