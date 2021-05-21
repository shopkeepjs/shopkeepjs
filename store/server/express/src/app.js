const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

app.enable('trust proxy');
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

const middlewares = require('./middleware');

app.get('/', async (_, res) => {
  res.send({ message: '🎂' });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = { app };
