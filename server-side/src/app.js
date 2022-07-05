const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./auth/passport');
require('./models/index');

const middlewares = require('./middlewares');
const appRouter = require('./api/routes/app.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
const allowedDomains = [
  'http://localhost:4200',
  'https://video-sharing-demo.web.app',
];
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/homepage.html'));
});

app.use(appRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
