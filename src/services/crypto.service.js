const { Crypto, validateCrypto } = require('../models/crypto.model');
const logger = require('pino')();

const createCrypto = async (data) => {
  try {
    //validate props
    const { error } = validateCrypto(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    //interact with db
    const newCrypto = new Crypto(data);
    const savedCrypto = await newCrypto.save();
    //logger see result
    logger.info('Crypto created successfully:', savedCrypto);
    return savedCrypto;
  } catch (error) {
    logger.error('Crypto creation failed:', error.message);
    throw new Error('Crypto creation failed');
  }
};

const getAllCryptos = async () => {
  try {
    const cryptos = await Crypto.find({}).exec();
    logger.info('Fetched all cryptocurrencies:', cryptos);
    return cryptos;
  } catch (error) {
    logger.error('Failed to fetch cryptocurrencies:', error.message);
    throw new Error('Failed to fetch cryptocurrencies');
  }
};

const getOneCrypto = async (id) => {
  try {
    const crypto = await Crypto.findById(id).exec();
    logger.info('Fetched cryptocurrency:', crypto);
    return crypto;
  } catch (error) {
    logger.error('Failed to fetch the cryptocurrency:', error.message);
    throw new Error('Failed to fetch the cryptocurrency');
  }
};

const updateCrypto = async (id, updateData) => {
  try {
    const { error } = validateCrypto(updateData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const updatedCrypto = await Crypto.findByIdAndUpdate(id, updateData, { new: true }).exec();

    logger.info('Crypto updated successfully:', updatedCrypto);

    return updatedCrypto;
  } catch (error) {
    logger.error('Crypto update failed:', error.message);
    throw new Error('Crypto update failed');
  }
};

const deleteCrypto = async (id) => {
  try {
    const deletedCrypto = await Crypto.findByIdAndDelete(id).exec();

    logger.info('Crypto deleted successfully:', deletedCrypto);

    return deletedCrypto;
  } catch (error) {
    logger.error('Crypto deletion failed:', error.message);
    throw new Error('Crypto deletion failed');
  }
};

module.exports = {
  createCrypto,
  getAllCryptos,
  getOneCrypto,
  updateCrypto,
  deleteCrypto,
};
