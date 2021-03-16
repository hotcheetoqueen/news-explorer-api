const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
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
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user.id,
  })
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
    .then((article) => {
      if (article && req.user.id === article.owner) {
        Article.deleteOne(article)
          .then((deletedArticle) => {
            res.status(200).send(deletedArticle);
          });
      } else if (!article) {
        throw new NotFoundError('That article does not exist');
      } else {
        throw new AuthError('You can only delete your own articles');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Something went wrong');
      }
      next(err);
    })
    .catch(next);
};
