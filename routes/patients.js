const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { Patient, validate } = require("../models/patient");

// routes

// create patient
router.post("/add_patient", async (req, res) => {
  // Validate The Request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Check if already exisits
  let patient = await Patient.findOne({ ssn: req.body.ssn });
  if (patient) {
    return res.status(400).send("That patient already exisits!");
  } else {
    // Insert the new patient if they do not exist yet
    patient = new Patient(
      _.pick(req.body, [
        "ssn",
        "firstName",
        "lastName",
        "email",
        "gender",
        "Dep_phone_number",
        "password",
        "history",
        "entryDate",
        "exitDate"
      ])
    );
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(patient.password, salt);
    await patient.save();
    res.send(patient);
  }
});

// Assign patient to a doctor
router.post("/assign_patient/:id", async (req, res) => {
  let patient = await Patient.findOne({ _id: req.params.id });

  // patient.doctors.push(req.id);
  console.log(req.body);
});

// delete patient
// delete
router.delete("/:id", async (req, res) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.send(patient);
});
//..................

async function getPatients() {
  return await Patient;
}

router.get("/", (req, res) => {
  const patients = getPatients();
  res.send(patients);
});

router.get("/:id", (req, res) => {
  const patients = getPatients();
  const patient = patients.find(c => c.id === parseInt(req.params.id));
  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");
  res.send(patient);
});

module.exports = router;
