const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const v1Router = require('../routes')
const config = require('../config')
const errorHandlerMiddleware=require('../middleware/error-handler')

module.exports = async (app) => {
  //enable cors
  app.use(cors())
  //Json body
  app.use(express.json())
  //log request
  app.use(morgan('dev'))
  //mount the v1 router
  app.use(config.api.prefix, v1Router)
  //error handling middleware
  app.use(errorHandlerMiddleware); 
  
  return app
}

