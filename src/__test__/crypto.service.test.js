const { createCrypto, getAllCryptos, getOneCrypto, updateCrypto, deleteCrypto } = require('../services/crypto.service');
const { Crypto } = require('../models/crypto.model');

jest.mock('../models/crypto.model');

describe('Crypto Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCrypto', () => {
    it('should create a new crypto', async () => {
      const mockData = { name: 'Bitcoin', symbol: 'BTC' };
      const mockCryptoInstance = { save: jest.fn().mockResolvedValueOnce(mockData) };
      Crypto.mockReturnValueOnce(mockCryptoInstance);

      const result = await createCrypto(mockData);

      expect(Crypto).toHaveBeenCalledWith(mockData);
      expect(mockCryptoInstance.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockData);
    });
  });

  describe('getAllCryptos', () => {
    it('should get all cryptos', async () => {
      const mockCryptos = [{ name: 'Bitcoin', symbol: 'BTC' }, { name: 'Ethereum', symbol: 'ETH' }];
      Crypto.find.mockResolvedValueOnce(mockCryptos);

      const result = await getAllCryptos();

      expect(Crypto.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockCryptos);
    });
  });

  describe('getOneCrypto', () => {
    it('should get a specific crypto by ID', async () => {
      const mockId = 'mockId';
      const mockCrypto = { name: 'Bitcoin', symbol: 'BTC' };
      Crypto.findById.mockResolvedValueOnce(mockCrypto);

      const result = await getOneCrypto(mockId);

      expect(Crypto.findById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockCrypto);
    });
  });

  describe('updateCrypto', () => {
    it('should update a specific crypto by ID', async () => {
      const mockId = 'mockId';
      const mockUpdateData = { name: 'Bitcoin Updated', symbol: 'BTC' };
      const mockUpdatedCrypto = { name: 'Bitcoin Updated', symbol: 'BTC', otherField: 'otherValue' };
      Crypto.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedCrypto);

      const result = await updateCrypto(mockId, mockUpdateData);

      expect(Crypto.findByIdAndUpdate).toHaveBeenCalledWith(mockId, mockUpdateData, { new: true });
      expect(result).toEqual(mockUpdatedCrypto);
    });
  });

  describe('deleteCrypto', () => {
    it('should delete a specific crypto by ID', async () => {
      const mockId = 'mockId';
      const mockDeletedCrypto = { name: 'Bitcoin', symbol: 'BTC' };
      Crypto.findByIdAndDelete.mockResolvedValueOnce(mockDeletedCrypto);

      const result = await deleteCrypto(mockId);

      expect(Crypto.findByIdAndDelete).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockDeletedCrypto);
    });
  });
});
