//build out schema for model for workouts.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },

    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter exercise type.",
        },
        name: {
          type: String,
          trim: true,
          required: "Enter excercise name.",
        },
        duration: {
          type: Number,
          required: "Enter the duration.",
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  { toJSON: { virtuals: true } }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
