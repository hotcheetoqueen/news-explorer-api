const router = require('express').Router();
const auth = require('../controllers/auth');
const { celebrate, Joi } = require('celebrate');

router.post('/signup', (req, res) => {
  res.send(signup)
});

router.post('/signin', (req, res) => {
  res.send(signin)
});

module.exports = router;