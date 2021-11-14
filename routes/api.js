const router = require("express").Router();
const Workouts = require("../models/workouts.js");
const mongoose = require("mongoose");

router.get("/api/workouts", (req, res) => {
    Workouts.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }])
        .sort({
            day: 1
        })
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", async (req, res) => {
    try {
        const workouts = await Workouts.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, {
            $push: {
                "exercises": req.body
            }
        }, {
            new: true
        });
        res.json(workouts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post("/api/workouts", (req, res) => {
    Workouts.create(req.body)
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", async (req, res) => {
    try {
        const workoutRange = await Workouts.aggregate(
                [{
                    $addFields: {
                        totalDuration: {
                            $sum: "$exercises.duration"
                        }
                    }
                }]
            )
            .sort({
                day: -1
            }).limit(7)
        res.json(workoutRange);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;