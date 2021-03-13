const router = require('express').Router();
const articles = require('../controllers/articles');
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
  articles.getArticles(req, res);
});

router.post('/', auth, (req, res) => {
  articles.postArticle(req, res);
});

router.delete('/:articleId', auth, (req, res) => {
  articles.deleteArticle(req, res);
});

module.exports = router;