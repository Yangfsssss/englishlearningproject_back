const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('express-async-errors')

const app = express()

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')
const QAUnitRouter = require('./controllers/QAUnit')
const sectionsRouter = require('./controllers/sections')
const dailyLearningStuffRouter = require('./controllers/dailyLearningStuff')
const fileUploadRouter = require('./controllers/fileUpload')

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

app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/basic', QAUnitRouter)
app.use('/api/sections', sectionsRouter)
app.use('/api/dailylearningstuff', dailyLearningStuffRouter)
app.use('/api/fileUpload', fileUploadRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app