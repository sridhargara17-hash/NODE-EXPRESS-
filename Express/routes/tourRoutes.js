const express = require("express");
const Router = express.Router();
const { getAllTours, getTour, createTour, updateTours, deleteTours, getToursStatus, getMonthlyPlan } = require('../Controllers/toursController')
const { signup, login, protect, restrictTo } = require('../Controllers/authController');
const reviewController = require('../Controllers/reviewController')
const reviewRouter=require('./reviewRoute')
// -----------param middlewares----------------------
// Router.param('id', (req, res, next, val) => {
//   console.log(`Tour Id is :${val}`)
//   next()
// })
// Router.param('id', checkId)
// Router.param('id')
// ----------------------------------------------------
Router.use('/:tourId/reviews',reviewRouter)
// Router.route('/:tourId/reviews').post(protect,reviewController.createReview)
// Router.route('/:tourId/reviews').get(protect,reviewController.createReview)
// ------------------------------------------------------
Router.route('/top-5-cheap').get((req, res, next) => {
 Object.defineProperty(req, 'query', {
    value: {
      limit: '5',
      sort: '-ratingsAverage,price',
      fields: 'name,price,ratingsAverage,summary,difficulty'
    },
    writable: true,
    configurable: true
  });
  next()
}, getAllTours)
Router.route('/tours-stats').get(getToursStatus)
Router.route('/monthly-plan/:year').get(getMonthlyPlan)
Router.route("/").
      get(protect,getAllTours).
      post(createTour).
      patch(updateTours);

Router.route("/:id")
  .get(getTour)
  .post(createTour)
  .patch(updateTours)
  .delete(protect,restrictTo('admin','lead-guide'),deleteTours);

module.exports = Router;
