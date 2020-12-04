const router = require('express').Router();
const users = require('../controllers/users');
const { validateId } = require('../middlewares/validator');
const { celebrate, Joi } = require('celebrate');

router.get('/', (req, res) => {
  users.getUsers(req, res);
});

router.get('/me', validateId, (req, res) => {
  users.getCurrentUser(req, res);
});

module.exports = router;