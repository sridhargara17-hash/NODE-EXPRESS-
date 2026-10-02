const AppError = require('../utils/appError')

const handleCastErrorDb = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400)

const handleDuplicateFieldDB = (err) => {
  const field = Object.keys(err.keyValue)[0]
  const value = err.keyValue[field]
  return new AppError(
    `Duplicate field value: "${value}" for field "${field}". Please use another value.`,
    400
  )
}

const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  return new AppError(`Invalid input data. ${errors.join('. ')}`, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrProd = (err, res) => {
  // operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    // programming or unknown error: don't leak details
    console.error('ERROR ❌', err)
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    // convert JWT errors in dev too, so you see proper 401s while testing
    let error = err
    if (err.name === 'JsonWebTokenError') error = handleJWTError()
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
    sendErrDev(error, res)
  } else {
    let error = Object.create(err)   // keeps prototype, name, message, stack
    if (err.name === 'CastError') error = handleCastErrorDb(err)
    if (err.code === 11000) error = handleDuplicateFieldDB(err)
    if (err.name === 'ValidationError') error = handleValidationDB(err)
    if (err.name === 'JsonWebTokenError') error = handleJWTError()
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
    sendErrProd(error, res)
  }
}