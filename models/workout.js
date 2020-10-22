//build out schema for model for workouts.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: Date,
  exercises: Array,
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
