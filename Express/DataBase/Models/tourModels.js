const {model} = require('mongoose')
const tourSchema = require('../Schemas/tourSchema')
const Tour = model('Tour', tourSchema);
const testTour = new Tour({
    name: "the Forest Hiker",
    rating: 4.7,
    price:499
}) 
const saveTour = async () => {
   await testTour.save().then(
  doc => {
    console.log(doc)
  }
).catch(err => {
  console.log('error',err) 
}) 
}
// saveTour() 
// console.log(Tour.schema.virtualpath('reviews'));

module.exports=Tour