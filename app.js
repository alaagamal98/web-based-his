const express = require("express");
const mongoose = require("mongoose");
const app = express();

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

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
