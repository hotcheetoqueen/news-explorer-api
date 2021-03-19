const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_MESSAGES } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({ }).select('+password')
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'TypeError' || err.name === 'CastError') {
        throw new NotFoundError(ERROR_MESSAGES.userNotFound);
      }
      next(err);
    })
    .catch(next);
};
