const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();
const { DB_ACCESS, STATUS_CODES, ERROR_MESSAGES } = require('./utils/constants');

const routes = require('./routes/index.js');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_ACCESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());

app.use('/', routes);

app.use((err, req, res, next) => {
  const { statusCode = STATUS_CODES.internalServer, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_CODES.internalServer
        ? ERROR_MESSAGES.internalServer
        : message,
    });

  next();
});

app.get('*', (req, res) => {
  res.status(STATUS_CODES.notFound).send({ message: ERROR_MESSAGES.notFound });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
