const cryptoService = require('../services/crypto.service');

const createCrypto = async (req, res) => {
  try {
    const newCrypto = await cryptoService.createCrypto(req.body);
    res.json(newCrypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await cryptoService.getAllCryptos();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneCrypto = async (req, res) => {
  const { id } = req.params;
  try {
    const crypto = await cryptoService.getOneCrypto(id);
    res.json(crypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCrypto = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCrypto = await cryptoService.updateCrypto(id, req.body);
    res.json(updatedCrypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCrypto = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCrypto = await cryptoService.deleteCrypto(id);
    res.json(deletedCrypto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCrypto,
  getAllCryptos,
  getOneCrypto,
  updateCrypto,
  deleteCrypto,
};
