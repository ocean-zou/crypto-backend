const express = require('express');
const router = express.Router();
const {
  deleteCrypto,
  updateCrypto,
  getOneCrypto,
  getAllCryptos,
  createCrypto,
} = require('../controllers/crypto.controller');

// Crypto Routes:
// Create a new crypto: POST /api/cryptos
router.post('/', createCrypto);
// Get a list of all cryptos: GET /api/cryptos
router.get('/', getAllCryptos);
// Get a specific crypto: GET /api/cryptos/:id
router.get('/:id', getOneCrypto);
// Update a crypto's details: PUT /api/cryptos/:id
router.put('/:id', updateCrypto);
// Delete a crypto: DELETE /api/cryptos/:id
router.delete('/:id', deleteCrypto);

module.exports = router;
