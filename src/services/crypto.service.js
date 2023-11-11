const {Crypto} = require('../models/crypto.model');

const createCrypto = async (data) => {
  // interact with db
  const newCrypto = new Crypto(data);
  return newCrypto.save();
};

const getAllCryptos = async () => {
  return Crypto.find({});
};

const getOneCrypto = async (id) => {
  return Crypto.findById(id);
};

const updateCrypto = async (id, updateData) => {
  return Crypto.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCrypto = async (id) => {
  return Crypto.findByIdAndDelete(id);
};

module.exports = {
  createCrypto,
  getAllCryptos,
  getOneCrypto,
  updateCrypto,
  deleteCrypto,
};
