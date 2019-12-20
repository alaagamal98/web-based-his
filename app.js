const express = require("express");
const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const app = express();
const doctor = require('./routes/doctor')
const patient = require('./routes/patient')
const medicine = require('./routes/medicine')

// Connect to database
// P.S create a database called "icu" first
mongoose.connect("mongodb://localhost/icu")
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.log('could not connect to MongoDB...'))
// let db = mongoose.connection;

// // Check connection
// db.once("open", function() {
//   console.log("Connected to MongoDB");
// });

// // Check for DB errors
// db.on("error", function(err) {
//   console.log(err);
// });

// Route Files
let doctors = require("./routes/doctors");
app.use("/doctors", doctors);

// For testing
app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
