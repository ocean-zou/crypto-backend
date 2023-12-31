const mongoose = require('mongoose')
const logger = require('pino')();
const connectDB = async (URI) => {
  if (!URI) {
    throw new Error('Please provide a valid URI')
  }
  const db = mongoose.connection

  db.on('error', (error) => logger.info(error))
  db.on(
    'connected', () => logger.info('✅Connected to MongoDB✅')
  )
  db.on('disconnected', () => logger.info('❌Disconnected from MongoDB❌'))
  try {
    await mongoose.connect(URI);
  } catch (error) {
    logger.info(error);
    throw error; // Throw the error instead of calling process.exit
  }
}

const db = async (URI) => {
  try {
    await connectDB(URI)
  } catch (error) {
    logger.info(error)
    throw error;
  }
}

module.exports = db
