const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const flash = require("connect-flash");
const bodyParser = require("body-parser");

// Connect to database
// P.S create a database called "icu" first
mongoose.connect("mongodb://localhost/icu");
let db = mongoose.connection;

// Check connection
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Check for DB errors
db.on("error", function(err) {
  console.log(err);
});

// Route Files
// let doctors = require("./routes/doctors");
// app.use("/doctors", doctors);

// let user = require("./routes/user");
// app.use("/user", user);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// let user = require("./routes/user");
// app.use("/user", user);
let doctors = require("./routes/doctors");
app.use("/doctors", doctors);

// For testing
app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
