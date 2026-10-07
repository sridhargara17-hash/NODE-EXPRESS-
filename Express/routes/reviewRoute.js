const express = require('express')
const { signup, login, protect, restrictTo } = require('../Controllers/authController')
const reviewController=require('../Controllers/reviewController')
const reviewRouter = express.Router({ mergeParams: true })
// What mergeParams: true does
// Suppose your main tour router has:
// Router.route('/:tourId/reviews')
//     .post(protect, reviewController.createReview);
// Or more commonly, you have a separate review router mounted like:
// Router.use('/:tourId/reviews', reviewRouter);
// Then inside reviewRouter:
// const reviewRouter = express.Router({ mergeParams: true });
// allows the child router to access the parent's tourId.
// Without mergeParams: true:
reviewRouter.route('/')
    .get(protect, reviewController.getAllReviews)
    .post(protect, restrictTo('user', 'admin'), reviewController.createReview)
module.exports = reviewRouter

