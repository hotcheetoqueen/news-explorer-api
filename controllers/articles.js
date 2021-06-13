const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const article = require('../models/article');
const Article = require('../models/article');
const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user.id })
    .populate('owner')
    .then((articles) => {
        res.status(STATUS_CODES.ok).send({ data: articles });
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
      res.status(STATUS_CODES.ok).send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(ERROR_MESSAGES.badRequest);
      }
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOneAndRemove({ _id: req.params.id, owner: req.user.id })
    .then((deletedArticle) => {
      res.status(STATUS_CODES.ok).send(deletedArticle);
    })
    .catch((err) => {
        throw new NotFoundError(ERROR_MESSAGES.notFound);
    })
    .catch(next);
  }
