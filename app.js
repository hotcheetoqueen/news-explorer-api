// const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const articlesRoute = require('./routes/articles');
const usersRoute = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

// app.use(cors());
// app.options('*', cors());

mongoose.connect('mongodb://localhost:27017/newsexplorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/articles', articlesRoute);
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
