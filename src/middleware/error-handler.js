const errorMiddleware = (err, req, res, next) => {
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';
  
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      statusCode = 400;
      errorMessage = 'Invalid JSON';
    } else if (err.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = err.message;
    } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 400;
      errorMessage = 'Bad Request';
    }else if (err.name === 'NotFound') {
      statusCode = 404;
      errorMessage = 'Not Found Crypto';
    }
  
    res.status(statusCode).json({ error: errorMessage });
  };
  
  module.exports = errorMiddleware;
  