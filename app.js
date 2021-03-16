const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const cors = require('cors');
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsexplorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
// const routes = require('./routes/index');
const { signup, signin } = require('./controllers/auth');

app.post('/signup', signup);
app.post('/signin', signin);

const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');

app.use('/articles', articlesRoute);
app.use('/users', usersRoute);

app.use(errorLogger);

app.use(errors());

// app.use(cors());
// app.options('*', cors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'An error occurred on the server' : message });

  next();
});

app.get('*', (req, res) => {
  res.status(404).send('Requested resource not found');
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
