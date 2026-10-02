
const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`./assets/tours-simple.json`, "utf8"));
// ------------parem middleware controller-------------------
const checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message:"Invalid Id" 
    })
  }
  next()
}

// ----------------------------------------------------


const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
const postAllTours = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/assets/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    },
  );
};
const patchAllTours = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(400).json({
      status: "fail",
      message: "Invaild",
    });
  }

  res.status(200).json({
    status: "sucess",
    data: {
      tour: "<tours updated here>",
    },
  });
};
const deleteAllTours = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invaild",
    });
  }

  res.status(204).json({
    status: "sucess",
    data: {
      tour: null,
    },
  });
};
const getTour = (req, res) => {
  console.log(req.requestTime);
  const Id=req.params.id*1
  const tour = tours.find(el => el.id === Id);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour
    },
  });
};
module.exports ={getAllTours,getTour,postAllTours,patchAllTours,deleteAllTours,checkId}