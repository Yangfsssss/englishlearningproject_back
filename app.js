const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')

const app = express()

const sectionsRouter = require('./controllers/sections')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('connect to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error to connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/sections', sectionsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
