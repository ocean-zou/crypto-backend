const {Crypto} = require('../models/crypto.model');

const createCrypto = async (data) => {
  // interact with db
  const newCrypto = new Crypto(data);
  return newCrypto.save();
};

const getAllCryptos = async () => {
  return Crypto.find({}).exec();
};

const getOneCrypto = async (id) => {
  return Crypto.findById(id).exec();
};

const updateCrypto = async (id, updateData) => {
  return Crypto.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

const deleteCrypto = async (id) => {
  return Crypto.findByIdAndDelete(id).exec();
};

module.exports = {
  createCrypto,
  getAllCryptos,
  getOneCrypto,
  updateCrypto,
  deleteCrypto,
};
