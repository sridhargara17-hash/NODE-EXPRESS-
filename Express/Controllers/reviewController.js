const review = require('../DataBase/Schemas/reviewModel')
const catchAsync=require('../utils/catchAsync')
exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter={}
    if(req.params.tourId)filter={tour:req.params.tourId}
    const reviews = await review.find(filter)
    res.status(200).json({
        status: 'sucess',
        result:reviews.length,
        data: {
            reviews
        }
    })
})
exports.createReview = catchAsync(async (req, res, next) => {
    if (!req.body.tour) {
        req.body.tour = req.params.tourId;
      
    }
    if (!req.body.user) {
        req.body.user = req.user.id;
    }
    //    req.body.tour = req.params.tourID;
    // req.body.user = req.user.id;
    const newReview = await review.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            review:newReview
        }
    })
})