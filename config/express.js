const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const errorHandling = require('../lib/error/index');

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const notFoundError = errorHandling.commonErrors.ResourceNotFoundError(`Can not get ${req.url}`);
    return next(notFoundError);
});

// error handler
app.use(errorHandling.handling);

module.exports = app;
