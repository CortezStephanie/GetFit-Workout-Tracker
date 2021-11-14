const router = require("express").Router();
const workOuts = require("../models/workouts.js");

router.get("/api/workouts", (req, res) => {
    Workouts.find({})
      .sort({ day: 1 })
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

router.get("/api/workouts/range", (req, res) => {
    
});

  router.post("/api/workouts/bulk", ({ body }, res) => {
    Workouts.insertMany(body)
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });