const express = require('express');
const v1Router = express.Router();

const cryptoRouter = require('./crypto.routes');

v1Router.use('/crypto', cryptoRouter);

module.exports = v1Router;