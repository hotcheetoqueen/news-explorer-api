const router = require('express').Router();
const { signup, signin } = require('../controllers/auth');
const { validateSignup, validateSignin } = require('../middlewares/validator');

router.post('/signup', validateSignup, signup);

router.post('/signin', validateSignin, signin);

module.exports = router;
