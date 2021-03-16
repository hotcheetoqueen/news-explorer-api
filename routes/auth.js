const router = require('express').Router();
const { signup, signin } = require('../controllers/auth');

router.post('/signup', (req, res) => {
  res.send(signup);
});

router.post('/signin', (req, res) => {
  res.send(signin);
});

module.exports = router;
