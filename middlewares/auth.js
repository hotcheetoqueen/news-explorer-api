const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

require('dotenv').config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Request is not authorized');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  let NODE_ENV;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthError('Token is invalid');
  }

  req.user = payload;

  next();
};
