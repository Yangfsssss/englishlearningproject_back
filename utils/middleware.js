const morgan = require('morgan')

morgan.token('requestInfo', request => JSON.stringify(request.body))

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :requestInfo')

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}