// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    res.status(err.httpCode);
    res.json(err);
}

module.exports = errorHandler;
