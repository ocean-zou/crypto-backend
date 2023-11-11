const { VALIDATION_ERROR } = require('../utils/constants');

// error handler 
// 404
function handleNotFound(req, res, next) {
    res.status(404).json({ error: 'Not Found' });
}
// 400
function handleValidationError(err, req, res, next) {
    if (err.name === VALIDATION_ERROR) {
        res.status(400).json({ error: 'Validation Error', message: err.message });
    }  else {
        res.status(400).json({ error: 'Bad Request' });
    }
}
// 500
function handleInternalServerError(err, req, res, next) {
    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports={
    handleNotFound,
    handleValidationError,
    handleInternalServerError
}