const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

// ----------Importing modules--------------------
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
// ------------------MiddleWares---------------
app.use(express.json());//---------->using for json parser
app.use((req, res, next) => {
  console.log("hello from middleWare Ⓜ️");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(morgan("dev"));
// -----------creating tourRouter--------------
app.use("/tours", tourRouter);
app.use("/user", userRouter);
// --------------------------------------------
module.exports = app