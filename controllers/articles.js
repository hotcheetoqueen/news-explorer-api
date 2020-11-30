const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({ })
    // .populate('owner')
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user.id })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndDelete(req.params.articleId)
    .then((articles) => {
      res.send({ message: 'Article deleted' });
    })
    .catch(next);
};