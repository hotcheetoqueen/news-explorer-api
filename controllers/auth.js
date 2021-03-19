const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

const AuthError = require('../errors/AuthError');
const RequestError = require('../errors/RequestError');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

dotenv.config();
// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hash) => User.create({ name, email, password: hash })
    .then((user) => res.status(STATUS_CODES.created).send({
      message: `User ${email} successfully created!`,
      data: {
        id: user.id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(ERROR_MESSAGES.badRequest);
      }
      next(err);
    })
    .catch(next));
};

const getJwtToken = (id) => jwt.sign({ id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new RequestError(ERROR_MESSAGES.badRequest);
      }

      return bcrypt.compare(password, user.password, (error, isPasswordValid) => {
        if (!isPasswordValid) {
          throw new AuthError(ERROR_MESSAGES.unauthorized);
        }

        const token = getJwtToken(user.id);

        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        });

        return res.status(200).send({ token });
      });
    })
    .catch(next);
};
