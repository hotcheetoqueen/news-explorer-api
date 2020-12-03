const router = require('express').Router();

const auth = require('./auth');
const articles = require('./articles');
const users = require('./users');

router.use('/', auth);
router.use('/articles', articles);
router.use('/users', users);

module.exports = router;