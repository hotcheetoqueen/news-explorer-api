const router = require('express').Router();
const auth = require('../controllers/auth');

router.post('/signup', (req, res) => {
  res.send(signup)
});

router.post('/signin', (req, res) => {
  res.send(signup)
});

module.exports = router;