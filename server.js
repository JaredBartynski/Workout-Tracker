const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const { deflateSync } = require("zlib");
const Workout = require("./models/workout");

const app = express();

app.use(logger("dev"));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//API routes

app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.create({})
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

//HTML routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.listen(PORT, () => {
  console.log("App is running on http://localhost:${PORT}!");
});
