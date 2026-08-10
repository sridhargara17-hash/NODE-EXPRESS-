const express = require("express");
const fs = require("fs");
const app = express();
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/tours-simple.json`),
);
app.use(express.json());
const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            tours,
        },
    });
}
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
}
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
}
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
}
app
    .route("/api/v1/tours/:id")
    .get(getAllTours)
    .post(postAllTours)
    .patch(patchAllTours)
    .delete(deleteAllTours);

app.listen(8000, () => {
    console.log("server is running on port http://localhost:8000");
});
