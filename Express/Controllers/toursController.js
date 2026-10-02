const newTour = require('../DataBase/CURD/CraetingNewTour')
const API_Features=require('../utils/apiFeatures')
const { ReadingTour, data } = require('../DataBase/CURD/ReadingTours')
const catchAsync = require('../utils/catchAsync')
const  AppError=require('../utils/AppError')
const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`./assets/tours-simple.json`, "utf8"));
const Tours=require('../DataBase/Models/tourModels');
const Tour = require('../DataBase/Models/tourModels');
// !------------parem middleware controller-------------------
// const checkId = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message:"Invalid Id"
//     })
//   }
//   next()
// }

// ---------middle wares-------------------
// const aliasTopTours = (req, res, next) => {
//   console.log("hiiiiiiiiiiii")
//   //  limit=5&sort=-ratingsAverage,price
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price'
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
//   next()
//  }
// --------------------------------------------------------

const getAllTours = catchAsync(async (req, res) => {
  
    const features = new API_Features(Tour.find(), req.query)
      .filter()
      .sorting()
      .limiting()
      .pagination();
      const data = await features.Query
    res.status(200).json(data)
})
//? const getAllTours = async (req, res) => {
//   try {
    // ! Bulid a query
    //  ! Filtering
    // const queryObj = { ...req.query };
    // const excludefields = ['page', 'sort', 'limit', 'fields']
    // excludefields.forEach(el=>delete queryObj[el])
    // // console.log(req.query,queryObj)
    // console.log(req.query)
    // //! Advance flitering
    // let queryStr = JSON.stringify(queryObj)
    // queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    // //  console.log(JSON.parse(queryStr))
    // let Query = Tours.find(JSON.parse(queryStr))
    // //! 2) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy)
    //   Query=Query.sort(sortBy)
    // }
    // else {
    //   Query=Query.sort('-createdAt')
    // }

    // //! 3)  Limiting fields
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   Query = Query.select(fields);
    //   // console.log(fields)
    // } else {
    //   Query=Query.select('-__v')
    // }
    // //!  4)pagination
    // const page = req.query.page * 1 || 1
    // const limit = req.query.limit * 1 || 100
    // const skip = (page - 1) * limit
    // Query = Query.skip(skip).limit(limit)
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('this page does not exist')
    // }
    //   const data = await Query
    // -------------------------------------
     // const data = await Tours.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy')
    // exeute query
//     res.status(200).json(data)
//   }
//   catch(err) {
//     res.status(404).json(
//       {
//         status: "success",
//         message:err
//       }
//     )
//   }


// };
const createTour = catchAsync(async (req, res, next) => {
  const data =  req.body
     await newTour(data)
  res.status(201)
  .json(
      {
        status: 'succes',
        data: {
          tour:data
        }}) 
  
})


const updateTours = catchAsync(async (req, res,next) => {
 
  const data =  await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
    if (!data) {
    return next(new AppError('No tour found with that Id ',404))
  }
    res.status(200).json({
      status: 'Success',
      data: {
        data:data
      }
    })

})

const deleteTours = catchAsync(async(req, res,next) => {

  const data=await Tours.findByIdAndDelete(req.params.id);
    if (!data) {
    return next(new AppError('No tour found with that Id ',404))
  }
    res.status(204).json({
      status: "sucess",
    });
})


const getTour = catchAsync(async (req, res, next) => {
  const Id = req.params.id
  // console.log(Id)
  const data=await Tours.findById(Id)
  // console.log(typeof Id)
  console.log(data)
  if (!data) {
    return next(new AppError('No tour found with that Id ',404))
  }
  res.status(200).json({
    status: 'success',
    'data':{
      tour:data
    }
     });
})
const getToursStatus =catchAsync(async (req,res,next) => {

    const stats = await Tour.aggregate([
      {
        $match:{ratingsAverage:{$gte:4.5}}
      },
      {
        $group: {
          _id:{$toUpper: '$difficulty'} ,
          numTours:{$sum:1},
          numRatings:{$sum:'$ratingsQuantity'},
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice:{$max : '$price'}

        }
      }, {
        $sort:{avgPrice:1}
      },
      // {
      //   $match:{_id:{$ne:'EASY'}}
      // }
    ])
    res.status(200).json(stats);
  
})
const getMonthlyPlan=catchAsync(async(req,res,next) => {

    const year = req.params.year * 1
    const plan = await Tour.aggregate([{
      $unwind:'$startDates'
    },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStart: { $sum: 1 },
          tours:{$push:'$name'}
        }
      }
      ,{
        $addFields:{month:'$_id'} 
      }, {
        $project:{_id:0}
      }, {
        $sort: {numTourStart:-1}
      }, {
        $limit:6
      }
      
      
    ])
       res.status(200).json(plan)
})

module.exports ={getAllTours,getTour,createTour,updateTours,deleteTours,getToursStatus,getMonthlyPlan} 