const express = require("express");
const router = express.Router();
const Cars = require("../models/car.model");

//Show all cars, GET / request
router.get("/", async (req, res) => {
  try {
    const car = await Cars.find().sort({ Model: "desc" });
    res.send(car);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// Show cars older than 5 years
router.get("/old", async (req, res) => {
  try {
    const car = await Cars.find({ Model: { $lt: "2015" } }).sort({
      Model: "desc",
    });
    res.send(car);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// Creates a new car, POST /
router.post("/", async (req, res) => {
  try {
    const addcar = await Cars.create(req.body);

    return res.status(201).json({
      success: true,
      data: addcar,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Car not added",
    });
  }
});

// update many PUT /many
router.put("/many", async (req, res) => {
  const query = { Model: { $lte: "2010" } };

  try {
    let modcars = await Cars.updateMany(
      query,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: modcars,
    });
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
});

// update one existing car, PUT /:id
router.put("/:id", async (req, res) => {
  try {
    let modcar = await Cars.findOneAndUpdate(
      { _id: req.params.id },

      { $set: req.body },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: modcar,
    });
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
});

//Delete a car --> DELETE /:id
router.delete("/:id", async (req, res) => {
  try {
    const remcar = await Cars.remove({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
