const mongoose = require('mongoose');
const Joi = require('joi')
// write cryptoSchema first
const cryptoSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Symbol: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  High: {
    type: Number,
    required: true,
  },
  Low: {
    type: Number,
    required: true,
  },
  Open: {
    type: Number,
    required: true,
  },
  Close: {
    type: Number,
    required: true,
  },
  Volume: {
    type: Number,
    required: true,
  },
  Marketcap: {
    type: Number,
    required: true,
  },
});
//add joi validation to the crypto schema
const cryptoValidationSchema=Joi.object({
  Name: Joi.string().required(),
  Symbol: Joi.string().required(),
  Date: Joi.date().required(),
  High: Joi.number().required(),
  Low: Joi.number().required(),
  Open: Joi.number().required(),
  Close: Joi.number().required(),
  Volume: Joi.number().required(),
  Marketcap: Joi.number().required(),
})
//function to validate crypto date
const validateCrypto = (cryptoData) => {
  return cryptoValidationSchema.validate(cryptoData);
};
//create crypto model
const Crypto = mongoose.model('Crypto', cryptoSchema);
//export functio and model
module.exports = { Crypto, validateCrypto };