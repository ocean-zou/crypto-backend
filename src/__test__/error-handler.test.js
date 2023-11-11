const errorMiddleware = require('../middleware/error-handler');

describe('Error Middleware', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('handles generic errors', () => {
    const err = new Error('Test Error');
    errorMiddleware(err, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('handles SyntaxError with status 400', () => {
    const err = new SyntaxError('Invalid JSON');
    err.status = 400;
    err.body={};
    errorMiddleware(err, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid JSON' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('handles ValidationError with status 400', () => {
    const err = new Error('YourValidationErrorMessage');
    err.name = 'ValidationError';
    errorMiddleware(err, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'YourValidationErrorMessage' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('handles CastError with status 400', () => {
    const err = new Error('Bad Request');
    err.name = 'CastError';
    err.kind = 'ObjectId';
    errorMiddleware(err, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Bad Request' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('handles NotFound error with status 404', () => {
    const err = new Error('Crypto not found');
    err.name = 'NotFound';
    errorMiddleware(err, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Not Found Crypto' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
