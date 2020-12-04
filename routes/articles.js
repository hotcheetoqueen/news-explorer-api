const router = require('express').Router();
const articles = require('../controllers/articles');
const { celebrate, Joi } = require('celebrate');

router.get('/', (req, res) => {
  articles.getArticles(req, res);
});

router.post('/', (req, res) => {
  articles.postArticle(req, res);
});

router.delete('/articleId', (req, res) => {
  articles.deleteArticle(req, res);
});

module.exports = router;