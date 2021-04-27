const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const Article = require('../models/article');
const { ERROR_MESSAGES } = require('../utils/constants');

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
      if (err.name === 'ValidationError') {
        throw new RequestError(ERROR_MESSAGES.badRequest);
      }
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOneAndRemove({ _id: req.params.id, owner: req.user.id })
    .then((deletedArticle) => {
      res.status(200).send(deletedArticle);
    })
    .catch((err) => {
        throw new NotFoundError(ERROR_MESSAGES.notFound);
    })
    .catch(next);
  }

//   Article.findById(req.params.id).select('+owner')
//     .then((article) => {
//       if (article && req.user.id === article.owner) {
//         Article.deleteOne(article)
//           .then((deletedArticle) => {
//             res.status(200).send(deletedArticle);
//           });
//       } else if (!article) {
//         throw new NotFoundError(ERROR_MESSAGES.notFound);
//       } else {
//         throw new AuthError(ERROR_MESSAGES.unauthorized);
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         throw new NotFoundError(ERROR_MESSAGES.notFound);
//       }
//     })
//     .catch(next);
// };
