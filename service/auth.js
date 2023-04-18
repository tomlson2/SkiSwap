const jwt = require('jsonwebtoken');
const jwtSecret = 'secret';

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.email = decoded.email;
    next();
  });
}