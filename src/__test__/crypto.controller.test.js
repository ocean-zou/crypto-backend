const cryptoController = require('../controllers/crypto.controller');
const cryptoService = require('../services/crypto.service');

jest.mock('../services/crypto.service');

describe('Crypto Controller', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {
      body: {},
      user: { userId: '12345678901234' },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();

    jest.clearAllMocks(); // Clear all mocks between tests
  });

  describe('GET /cryptos', () => {
    it('should return all cryptos', async () => {
      const mockCryptos = [{ id: '1', name: 'Bitcoin' }, { id: '2', name: 'Ethereum' }];
      cryptoService.getAllCryptos.mockResolvedValue(mockCryptos);

      await cryptoController.getAllCryptos(mockRequest, mockResponse, mockNext);
      await new Promise(resolve => setImmediate(resolve));
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCryptos);
      expect(cryptoService.getAllCryptos).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting all cryptos', async () => {
      cryptoService.getAllCryptos.mockRejectedValue(new Error('Failed to get cryptos'));

      await cryptoController.getAllCryptos(mockRequest, mockResponse, mockNext);
      await new Promise(resolve => setImmediate(resolve));
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Failed to get cryptos'));
    });
  });

  // Add similar tests for other endpoints (create, getOne, update, delete)

  // Example for the POST /crypto endpoint
  describe('POST /crypto', () => {
    it('should create a new crypto', async () => {
      const mockCrypto = { name: 'Bitcoin', symbol: 'BTC' };
      cryptoService.createCrypto.mockResolvedValue(mockCrypto);

      mockRequest.body = mockCrypto;

      await cryptoController.createCrypto(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCrypto);
      expect(cryptoService.createCrypto).toHaveBeenCalledTimes(1);
      expect(cryptoService.createCrypto).toHaveBeenCalledWith(mockCrypto);
    });

    it('should handle errors when creating a new crypto', async () => {
      cryptoService.createCrypto.mockRejectedValue(new Error('Failed to create crypto'));

      mockRequest.body = { name: 'Bitcoin', symbol: 'BTC' };

      await cryptoController.createCrypto(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(new Error('Failed to create crypto'));
    });

    describe('GET /crypto/:id', () => {
      it('should return a specific crypto by ID', async () => {
        const mockCrypto = { id: '1', name: 'Bitcoin' };
        cryptoService.getOneCrypto.mockResolvedValue(mockCrypto);

        mockRequest.params = { id: '1' };

        await cryptoController.getOneCrypto(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockCrypto);
        expect(cryptoService.getOneCrypto).toHaveBeenCalledTimes(1);
        expect(cryptoService.getOneCrypto).toHaveBeenCalledWith('1');
      });

      it('should handle errors when getting a specific crypto by ID', async () => {
        cryptoService.getOneCrypto.mockRejectedValue(new Error('Failed to get crypto'));

        mockRequest.params = { id: '1' };

        await cryptoController.getOneCrypto(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error('Failed to get crypto'));
      });
    });

    describe('PUT /crypto/:id', () => {
      it('should update a specific crypto by ID', async () => {
        const mockUpdatedCrypto = { id: '1', name: 'Updated Bitcoin' };
        cryptoService.updateCrypto.mockResolvedValue(mockUpdatedCrypto);

        mockRequest.params = { id: '1' };
        mockRequest.body = { name: 'Updated Bitcoin' };

        await cryptoController.updateCrypto(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedCrypto);
        expect(cryptoService.updateCrypto).toHaveBeenCalledTimes(1);
        expect(cryptoService.updateCrypto).toHaveBeenCalledWith('1', { name: 'Updated Bitcoin' });
      });

      it('should handle errors when updating a specific crypto by ID', async () => {
        cryptoService.updateCrypto.mockRejectedValue(new Error('Failed to update crypto'));

        mockRequest.params = { id: '1' };
        mockRequest.body = { name: 'Updated Bitcoin' };

        await cryptoController.updateCrypto(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error('Failed to update crypto'));
      });
    });

    describe('DELETE /crypto/:id', () => {
      it('should delete a specific crypto by ID', async () => {
        const mockDeletedCrypto = { id: '1', name: 'Bitcoin' };
        cryptoService.deleteCrypto.mockResolvedValue(mockDeletedCrypto);

        mockRequest.params = { id: '1' };

        await cryptoController.deleteCrypto(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.json).toHaveBeenCalledWith(mockDeletedCrypto);
        expect(cryptoService.deleteCrypto).toHaveBeenCalledTimes(1);
        expect(cryptoService.deleteCrypto).toHaveBeenCalledWith('1');
      });

      it('should handle errors when deleting a specific crypto by ID', async () => {
        cryptoService.deleteCrypto.mockRejectedValue(new Error('Failed to delete crypto'));

        mockRequest.params = { id: '1' };

        await cryptoController.deleteCrypto(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledWith(new Error('Failed to delete crypto'));
      });
    });
  });
});
