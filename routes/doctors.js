const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { Doctor, validate } = require("../models/doctor");

// create doctor
router.post("/add_doctor", async (req, res) => {
  // Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if this doctor already exisits
  let doctor = await Doctor.findOne({ ssn: req.body.ssn });
  if (doctor) {
    return res.status(400).send("That doctor already exisits!");
  } else {
    // Insert the new doctor if they do not exist yet
    doctor = new Doctor(
      _.pick(req.body, [
        "ssn",
        "title",
        "first_name",
        "last_name",
        "email",
        "gender",
        "salary",
        "phone_number",
        "password"
      ])
    );
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(doctor.password, salt);
    await doctor.save();
    res.send(doctor);
  }
});

// delete

async function getDoctors() {
  return await Doctor;
}

router.get("/", (req, res) => {
  const doctors = getDoctors();
  res.send(doctors);
});

router.get("/:id", (req, res) => {
  const doctors = getDoctors();
  const doctor = doctors.find(c => c.id === parseInt(req.params.id));
  if (!doctor)
    return res.status(404).send("The doctor with the given ID was not found.");
  res.send(doctor);
});

// read

module.exports = router;
