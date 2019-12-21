const express = require("express");
const router = express.Router();
const { Doctor, validateDoctor } = require("../models/doctor");

// create doctor
router.post("/add_doctor", async (req, res) => {
  // Validate The Request
  const { error } = validateDoctor(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if this doctor already exisits
  let doctor = await Doctor.findOne({ email: req.body.email });
  if (doctor) {
    return res.status(400).send("That doctor already exisits!");
  } else {
    // Insert the new doctor if they do not exist yet
    doctor = new Doctor({
      ssn: req.body.ssn,
      title: req.body.title,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      salary: req.body.salary,
      phone_number: req.body.phone_number,
      password: req.body.password
    });
    await doctor.save();
    res.send(doctor);
  }
});

// delete

// update

// read

module.exports = router;
