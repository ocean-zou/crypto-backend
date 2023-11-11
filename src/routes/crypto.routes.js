const express = require('express');
const router = express.Router();
const {
  deleteCrypto,
  updateCrypto,
  getOneCrypto,
  getAllCryptos,
  createCrypto,
} = require('../controller/crypto.controller');

// Crypto Routes:

// Create a new crypto: POST /api/cryptos
router.post('/', createCrypto);
// Get a list of all cryptos: GET /api/cryptos
router.get('/', getAllCryptos);
// Get a specific crypto: GET /api/cryptos/:cryptoId
router.get('/:cryptoId', getOneCrypto);
// Update a crypto's details: PUT /api/cryptos/:cryptoId
router.put('/:cryptoId', updateCrypto);
// Delete a crypto: DELETE /api/cryptos/:cryptoId
router.delete('/:cryptoId', deleteCrypto);

module.exports = router;
