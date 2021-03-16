const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

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
        throw new NotFoundError('That user does not exist');
      }
      next(err);
    })
    .catch(next);
};
