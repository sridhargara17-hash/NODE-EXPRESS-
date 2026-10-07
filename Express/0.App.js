const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const xss = require('xss-clean')
const hpp=require('hpp')
// !----------Importing modules--------------------
const globalErrorhandler=require('./Controllers/errorController')
const AppError=require('./utils/appError')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter=require('./routes/reviewRoute')
// !------------------MiddleWares---------------
// secureity HTTP headers
app.use(helmet())
//!--------Body parser ,reading data from into body req.body---------------
const router = express.Router({ mergeParams: true });
app.use(express.json({ limit: '10kb' }));//---------->using for json parser
// Data sanitization aganist NoSql Query injection
app.use(mongoSanitize())
// Data sanitization aganist XSS
// app.use(xss())
// prevent parameter pollution
app.use(hpp({
  whitelist:['duration',"ratingsQuantity","ratingsAverage","maxGroupSize","difficulty"]
}))
//!--------------------------------------------------------------------------
app.set('query parser', 'extended'); 
app.use((req, res, next) => {
  // console.log("hello from middleWare Ⓜ️");
  // console.log(req.headers)
  next();
});
// Timestamp
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Limit requests from same API
const limiter =rateLimit ({ max: 10, windowMs: 60 * 60 * 1000, message: 'Too many requests from this ip please try again in an hour!' })
app.use('/user/', limiter)
//! ---------------env varable--------------
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
} 
//! -------------static file middleware----------------
app.use(express.static(`${__dirname}/public/images`))
app.use(express.static(`${__dirname}/public/Html`))
// !-----------creating tourRouter--------------
app.use("/tours", tourRouter);
app.use("/user", userRouter);
app.use("/review", reviewRouter);

//! ---------------ERROR MIDDDLEWARE-------------------------------------
app.all('*name', (req, res, next) => {
  // !----------------creating error instance---------------------------
  // const err = new Error(`Can't find ${req.originalUrl} on serevr`);
  // err.status = 'fail',
  //   err.statusCode = 404
  next(new AppError(`Can't find ${req.originalUrl} on serevr`,404));
})
app.use(globalErrorhandler)
  //! --------------------------------------------
module.exports = app