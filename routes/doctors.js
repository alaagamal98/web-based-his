const express = require("express");
const router = express.Router();
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
    doctor = new Doctor({
      ssn: req.body.ssn,
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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

async function getDoctors() {
  return await Doctor;
}
async function run(){
  const doctors =await getDoctors();
 return doctors;
}
router.get("/", (req, res) => {
  const doctors = run();
  res.send(doctors);
});

router.get("/:id", (req, res) => {
  const doctors = run();
  const doctor = doctors.findOne({id:parseInt(req.params.id)});
  if (!doctor)
    return res.status(404).send("The doctor with the given ID was not found.");
  res.send(doctor);
});

// read

module.exports = router;
