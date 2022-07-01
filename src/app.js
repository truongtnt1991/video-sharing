const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./auth/passport');

require('./models/user');
require('./models/video');

const middlewares = require('./middlewares');
const appRouter = require('./api/routes/app.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/homepage.html'));
});

app.use(appRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
