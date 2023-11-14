const { createCrypto, getAllCryptos, getOneCrypto, updateCrypto, deleteCrypto, getCryptoByDateRange } = require('../services/crypto.service');
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
  describe('getCryptoByDateRange', () => {
    it('should get crypto data for a valid date range', async () => {
      const mockStartDate = '2022-01-01';
      const mockEndDate = '2022-01-10';
      const mockCryptoData = [{ name: 'Bitcoin', symbol: 'BTC' }, { name: 'Ethereum', symbol: 'ETH' }];

      Crypto.find.mockResolvedValueOnce(mockCryptoData);

      const result = await getCryptoByDateRange(mockStartDate, mockEndDate);

      expect(Crypto.find).toHaveBeenCalledWith({
        Date: {
          $gte: new Date(mockStartDate),
          $lte: new Date(mockEndDate),
        },
      });
      expect(result).toEqual(mockCryptoData);
    });

    it('should handle no crypto data found for the specified date range', async () => {
      const mockStartDate = '2022-01-01';
      const mockEndDate = '2022-01-10';

      Crypto.find.mockResolvedValueOnce([]);

      const result = await getCryptoByDateRange(mockStartDate, mockEndDate);

      expect(Crypto.find).toHaveBeenCalledWith({
        Date: {
          $gte: new Date(mockStartDate),
          $lte: new Date(mockEndDate),
        },
      });
      expect(result).toEqual([]);
    });

    it('should handle errors when getting crypto data for a date range', async () => {
      const mockStartDate = '2022-01-01';
      const mockEndDate = '2022-01-10';

      Crypto.find.mockRejectedValueOnce(new Error('Failed to get crypto data'));

      await expect(getCryptoByDateRange(mockStartDate, mockEndDate)).rejects.toThrow('Failed to get crypto data');
    });
  })

});
