const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (error, hash) => {
    return User.create({ name, email, password: hash })
    .then((user) => {
      return res.status(200).send({
        message: `User ${email} successfully created!`,
        data: {
          id: user.id
        }
      });
    })
    .catch((err) => {
      if (err) {
        console.log('No user made');
        console.log(err);
      }
      next(err);
    })
    .catch(next);
  });
}

const getJwtToken = (id) => {
  return jwt.sign({ id }, 'secret');
}

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log('No user exists');
      }

      return bcrypt.compare(password, user.password, (error, isPasswordValid) => {

        if (!isPasswordValid) {
          console.log('Password is wrong');
        }

        const token = getJwtToken(user.id);

        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true
        })

        return res.status(200).send({ token });
      });
    })
    .catch(next);
}