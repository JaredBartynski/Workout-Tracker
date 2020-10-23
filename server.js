const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const { deflateSync } = require("zlib");

const app = express();

app.use(logger("dev"));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModigy: false,
});

app.use(express.static("public"));

/*API routes
POST /api/workouts
PUT /api/workouts/:id
GET /api/workouts/range (last 7 days: think limit)*/

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

//make a post route on workouts so that it makes a new workout in the database. post api/workouts

//make a put route so that I can update workouts or exercises. some sort of id on undefined. put/api/workouts/undefined

//get route on api/workouts/range

// there might be a delete step
