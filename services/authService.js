const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const UserModelInstance = new UserModel();
require('dotenv').config({ path: './services/authService.env' });

module.exports = class AuthService {

  /**
   * Finds an existing user or creates a new one in the database.
   * @param {Object} profile - The user profile information from GitHub.
   * @return {Object} The user record from the database.
   */
  
  async findOrCreateUser(profile) {
    //console.log(profile/*._json.login*/);
    try {
      let user = await UserModelInstance.findOneByGithubId(profile._json.id);

      if (!user) {
        const userData = {
          githubid: profile._json.id,
          login: profile._json.login,
          avatar_url: profile._json.avatar_url,
          gravatar_id: profile._json.gravatar_id,
          email: profile.emails[0]
        };
        user = await UserModelInstance.createUser(userData);
        return userData;
      }
      else
      {
        return null;
      }

      

    } catch (err) {
      throw new Error(err.message);
    }
  };

  /**
   * Generates a JWT token for a user.
   * @param {Object} user - The user object.
   * @return {String} The generated JWT token.
   */
  generateJwtToken(profile) {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ githubid: profile._json.id }, jwtSecret, { expiresIn: '1h' });
    return token;
  }

};