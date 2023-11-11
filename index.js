const app = require('./app');
const config = require('./src/config')
const db = require('./src/loader/db')
const logger=require('pino')()

async function startServer() {
  await db(config.mongo.uri)
  app.listen(config.port, (err) => {
    if (err) {
      process.exit(1)
      return
    }
    logger.info(
      `########🛡️ Server listening on port: ${config.port} 🛡️ ##########`,
    )
  })
}

startServer();
