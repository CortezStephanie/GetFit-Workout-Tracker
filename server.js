const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require('path');

const PORT = process.env.PORT || 3000;

const Workouts = require("./models/workouts");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", 
{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false 
  }
  );

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/exercise', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/exercise.html'))
);

app.get('/stats', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/stats.html'))
);
/*
app.post("/submit", ({ body }, res) => {
  Workouts.create(body)
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});*/

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
