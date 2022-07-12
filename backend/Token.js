const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (username) => {
  const accessToken = jwt.sign(
    { username: username },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '120s',
    }
  );
  return accessToken;
};

//
const authenticateToken = (req, res, next) => {
  const token = req.headers['token'];
  if (token == null) return res.sendStatus(401);
  else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
      if (err) return res.sendStatus(403);
      req.user = username;
      next();
    });
  }
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
