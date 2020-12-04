const AuthError = require('../errors/AuthError');
const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({ })
    // .populate('owner')
    .then((articles) => {
      res.status(200).send({ data: articles });
    })
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user.id })
    .then((article) => {
      res.status(200).send({ data: article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params.articleId)
    .then ((article) => {
      if (article && req.user.id.toString() === article.owner.toString()) {
        res.status(200).send({ message: 'Article deleted' });
      } else {
        throw new AuthError('You can only delete your own articles');
      }
    })
    .catch(next);
};