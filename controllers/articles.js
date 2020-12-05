const AuthError = require('../errors/AuthError');
const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({ })
    .populate('owner')
    .then((articles) => {
      res.status(200).send({ data: articles });
    })
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner: req.user.id })
    .then((article) => {
      res.status(200).send({ data: article });
    })
    .catch((err) => {
      console.log(err);

      if (err.name === 'ValidationError') {
        throw new RequestError('Unable to post article');
      }
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then ((article) => {
      if (article && req.user.id.toString() === article.owner.toString()) {
        Article.deleteOne(article)
          .then((article) => {
            res.status(200).send({ message: 'Article deleted' });
          })
      } else {
        throw new AuthError('You can only delete your own articles');
      }
    })
    .catch(next);
};