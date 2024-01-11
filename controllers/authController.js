const AuthServiceClass = require('../services/authService.js');
const authService = new AuthServiceClass();
const jwt = require('jsonwebtoken');


  const handleGitHubCallback = async (req, res) => {
    try {
      const user = await authService.findOrCreateUser(req.user);
      const token = authService.generateJwtToken(req.user);

      // Sending the token back to the client
      console.log(token);
      res.json({ token: token }); // Include the token in the response
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  handleGitHubCallback,
  authenticateToken
};
