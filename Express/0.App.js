const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

// !----------Importing modules--------------------
const globalErrorhandler=require('./Controllers/errorController')
const AppError=require('./utils/appError')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
// !------------------MiddleWares---------------

app.use(express.json());//---------->using for json parser
app.set('query parser', 'extended'); 
app.use((req, res, next) => {
  // console.log("hello from middleWare Ⓜ️");
  // console.log(req.headers)
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
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