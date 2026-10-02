const express = require("express");
const Router = express.Router();
const { getAllTours, getTour, postAllTours, patchAllTours, deleteAllTours,checkId } = require('../Controllers/toursController')
// -----------param middlewares----------------------
// Router.param('id', (req, res, next, val) => {
//   console.log(`Tour Id is :${val}`)
//   next()
// })
Router.param('id', checkId)
// ----------------------------------------------------
Router.route("/").
      get(getAllTours).
      post(postAllTours).
      patch(patchAllTours);

Router.route("/:id")
  .get(getTour)
  .post(postAllTours)
  .patch(patchAllTours)
  .delete(deleteAllTours);

module.exports = Router;
