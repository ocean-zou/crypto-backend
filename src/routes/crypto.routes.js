const express = require('express');
const router = express.Router();
const {
  deleteCrypto,
  updateCrypto,
  getOneCrypto,
  getAllCryptos,
  createCrypto,
  getCryptoByDateRange,
} = require('../controllers/crypto.controller');

// Crypto Routes:
// Create a new crypto: POST /api/cryptos
router.post('/', createCrypto);
// Route to get cryptocurrencies by date
router.get('/:startDate/:endDate', getCryptoByDateRange);
// Get a specific crypto: GET /api/cryptos/:id
router.get('/:id', getOneCrypto);
// Update a crypto's details: PUT /api/cryptos/:id
router.put('/:id', updateCrypto);
// Delete a crypto: DELETE /api/cryptos/:id
router.delete('/:id', deleteCrypto);
// Get a list of all cryptos: GET /api/cryptos
router.get('/', getAllCryptos);

module.exports = router;
