const router = require('express').Router();
const users = require('../controllers/users');

router.get('/', (req, res) => {
  users.getUsers(req, res);
});

router.get('/me', (req, res) => {
  users.getCurrentUser(req, res);
});

module.exports = router;