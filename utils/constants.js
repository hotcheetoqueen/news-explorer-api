const { NODE_ENV, PROD_DB_ACCESS } = process.env;

module.exports.DB_ACCESS = NODE_ENV === 'production' ? PROD_DB_ACCESS : 'mongodb://localhost:27017/newsexplorer';
module.exports.DEV_JWT = 'dev-secret';

module.exports.STATUS_CODES = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServer: 500,
};

module.exports.ERROR_MESSAGES = {
  badRequest: 'Something is wrong with that request.',
  unauthorized: 'Authorization required.',
  notFound: 'Resource not found.',
  internalServer: 'An error has occured on the server.',
  signup: 'We are unable to create a user with those credentials.',
  signin: 'Something is wrong with those credentials.',
  userNotFound: 'User not found.',
  articleNotFound: 'Article not found.',
  articleDelete: 'You do not have permissions to delete that article.',
};
