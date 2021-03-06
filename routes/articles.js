const router = require('express').Router();
const articles = require('../controllers/articles');

const auth = require('../middlewares/auth');
const { validatePostArticle, validateId } = require('../middlewares/validator');

router.get('/', auth, (req, res) => {
  articles.getArticles(req, res);
});

router.post('/', auth, validatePostArticle, (req, res, next) => {
  articles.postArticle(req, res, next);
});

router.delete('/:id', auth, validateId, (req, res) => {
  articles.deleteArticle(req, res);
});

module.exports = router;
