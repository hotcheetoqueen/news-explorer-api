const router = require('express').Router();
const { signup, signin } = require('../controllers/auth');
const { validateSignup, validateSignin } = require('../middlewares/validator');

router.post('/signup', validateSignup, (req, res) => {
  signup(req, res);
});

router.post('/signin', validateSignin, (req, res) => {
  signin(req, res);
});

module.exports = router;
