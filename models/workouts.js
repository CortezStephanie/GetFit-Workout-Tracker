const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: {
        type: Array
    }
});

const Workouts = mongoose.model("Workouts", WorkoutsSchema);

module.exports = Workouts;