const logger = require('../logger/logger');
const errorHandling = require('../error/index');

function decider(err) {
    let error = null;
    if (err != null && err.status !== undefined) {
        switch (err.status) {
        case 400:
            error = errorHandling.commonErrors.InvalidInputError(err.message);
            break;
        case 401:
            error = errorHandling.commonErrors.UnauthorizedError(err.message);
            break;
        case 403:
            error = errorHandling.commonErrors.OperationNotAllowedError(err.message);
            break;
        case 404:
            error = errorHandling.commonErrors.ResourceNotFoundError(err.message);
            break;
        case 409:
            error = errorHandling.commonErrors.ConflictError(err.message);
            break;
        case 422:
            error = errorHandling.commonErrors.BadFormatError(err.message);
            break;
        case 503:
            error = errorHandling.commonErrors.ServiceUnavailableError(err.message);
            break;
        default:
            error = errorHandling.commonErrors.UnknownError(err.message);
        }
    } else {
        error = errorHandling.commonErrors.UnknownError(err.message);
    }
    return error;
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    const error = decider(err);
    logger.info(`Exception caught by express middleware ${error.toString()}`);
    res.status(error.httpCode);
    res.json(error);
}

module.exports = errorHandler;
