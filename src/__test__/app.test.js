const { createRequest, createResponse } = require('node-mocks-http');
const app = require('../../app');

describe('Express App', () => {
  it('handles GET /api/v1/health', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/v1/health',
    });
    const res = createResponse();
    await app(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toBe('ok');
  });

});





