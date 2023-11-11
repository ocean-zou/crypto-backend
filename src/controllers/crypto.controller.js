const cryptoService = require('../services/crypto.service');

const createCrypto = async (req, res, next) => {
  try {
    const newCryptoInfo = req.body;
    const newCrypto = await cryptoService.createCrypto(newCryptoInfo);
    res.status(201).json(newCrypto);
  } catch (error) {
    next(error);
  }
};

// Get all cryptocurrencies
const getAllCryptos = async (req, res, next) => {
  try {
    const cryptos = await cryptoService.getAllCryptos();
    res.status(200).json(cryptos);
  } catch (error) {
    next(error);
  }
};

// Get a specific cryptocurrency by ID
const getOneCrypto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const crypto = await cryptoService.getOneCrypto(id);
    if (!crypto) {
      const notFoundError = new Error('Crypto not found');
      notFoundError.name = 'NotFound';
      next(notFoundError);
    } else {
      res.status(200).json(crypto);
    }
  } catch (error) {
    next(error);
  }
};

// Update a specific cryptocurrency by ID
const updateCrypto = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCrypto = await cryptoService.updateCrypto(id, updateData);
    if (!updatedCrypto) {
      const notFoundError = new Error('Crypto not found');
      notFoundError.name = 'NotFound';
      next(notFoundError);
    } else {
      res.status(200).json(updatedCrypto);
    }
  } catch (error) {
    next(error);
  }
};

// Delete a specific cryptocurrency by ID
const deleteCrypto = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCrypto = await cryptoService.deleteCrypto(id);
    if (!deletedCrypto) {
      const notFoundError = new Error('Crypto not found');
      notFoundError.name = 'NotFound'; // Set a custom name for identification in the error middleware
      next(notFoundError);
    } else {
      res.status(204).json(deletedCrypto);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCrypto,
  getAllCryptos,
  getOneCrypto,
  updateCrypto,
  deleteCrypto,
};
