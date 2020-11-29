const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({ }).select('+password')
    .then((users) => res.send({ data: users }))
    .catch(next);
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      res.send(user);
    })
    .catch(next);
}