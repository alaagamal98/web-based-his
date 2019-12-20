const express = require("express");
const router = express.Router();

// Import doctor model
let Doctor = require("../models/doctor");

router.get("/add_doctor", (req, res) => {
  res.send("Adding a doctor");
});

module.exports = router;
