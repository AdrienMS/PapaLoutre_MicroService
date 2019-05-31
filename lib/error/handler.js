const logger = require('../logger/logger');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    logger.info(`Exception caught by express middleware ${err.toString()}`);
    res.status(err.httpCode);
    res.json(err);
}

module.exports = errorHandler;
