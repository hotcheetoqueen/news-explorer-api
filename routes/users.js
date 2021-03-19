const router = require('express').Router();
const users = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
  users.getUsers(req, res);
});

router.get('/me', auth, (req, res) => {
  users.getCurrentUser(req, res);
});

module.exports = router;
