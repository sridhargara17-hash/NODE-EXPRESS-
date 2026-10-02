const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

// ----------Importing modules--------------------
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
// ------------------MiddleWares---------------
app.use(express.json());
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
app.listen(8000, () => {
  console.log("server is running on port http://localhost:8000");
});
