const mongoose = require('mongoose')
const tour = require('../Models/tourModels')
const user=require('./userSchemas')
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required:[true,'review cannot be empty'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        // required:[true,'']
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required:[true,'review must belong to a tour']
    },
    user: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:[true,'review must belong to a user']
    }]
},
    {
        toJSON: { virtuals: true },
        toObject:{virtuals:true}
    })

reviewSchema.pre(/^find/, function () {
    // this.populate({ path: 'user', select: 'name' })
    //     .populate({ path: 'tour', select: 'name' })

     this.populate({ path: 'user', select: 'name' })
return 
}
)
const Review = mongoose.model('review', reviewSchema)
module.exports=Review