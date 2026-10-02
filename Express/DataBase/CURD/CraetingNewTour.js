const Tour=require('../Models/tourModels')
const newTour = async (data) => {
    await Tour.create(data)
}
module.exports =newTour