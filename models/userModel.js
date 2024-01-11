const db = require('../database/dbConfig');
const pgp = require('pg-promise')({ capSQL: true });
require('dotenv').config({ path: './services/authService.env' });


module.exports = class UserModel {

  /**
   * Finds a user record by ID
   * @param  {String}      githubId [User ID]
   * @return {Object|null}    [User Record]
   */

  async findOneByGithubId (githubId) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE githubid = $1`;
      const values = [githubId];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Creates a new user record
   * @param  {Object}      data [User data]
   * @return {Object|null}      [Created user record]
   */
  async createUser (userData) {
    
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(userData, null, 'users') + 'RETURNING *';
  
      // Execute SQL statment
      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /*
  
  async saveToken(githubid, token) {
    try {
      const data = {
        token: token // Assuming the column in your 'users' table for the token is named 'token'
      };
  
      // Prepare the condition for the UPDATE operation
      const condition = pgp.as.format('WHERE githubid = ${githubid}', { githubid });
  
      // Generate the SQL UPDATE statement
      const statement = pgp.helpers.update(data, ['token'], 'users') + condition + ' RETURNING *';
  
      // Execute the SQL statement
      const result = await db.query(statement);
  
      if (result.rows?.length) {
        return result.rows[0];
      }
  
      return null;
  
    } catch(err) {
      throw new Error(err.message);
    }
  }
  
  */
  };

  