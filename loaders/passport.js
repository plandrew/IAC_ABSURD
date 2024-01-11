require('dotenv').config({ path: './loaders/configData.env' });
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

//const AuthService = require('../services/authService.js');
//const AuthServiceInstance = new AuthService();

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());
  
  /*

  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  */

  // Configure local strategy to be use for local login

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/callback",
      scope: ['user:email'],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  ));
  
  return passport;
}
