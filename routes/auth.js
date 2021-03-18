const router = require('express').Router();
const { signup, signin } = require('../controllers/auth');
const { validateSignup, validateSignin } = require('../middlewares/validator');

router.post('/signup', validateSignup, (req, res) => {
  res.send(signup);
});

router.post('/signin', validateSignin, (req, res) => {
  res.send(signin);
});

module.exports = router;
