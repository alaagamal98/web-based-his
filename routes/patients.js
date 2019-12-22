const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { Patient, validate } = require("../models/patient");
const { Doctor, validateDoctor } = require("../models/doctor");

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
  let patient = await Patient.findById(req.params.id);
  // Check if the patient already assigned
  let index = _.find(patient.Doctors, element => {
    return element == req.body._id;
  });
  if (index != undefined) {
    return res
      .status(400)
      .send("The patient is already assigned to this doctor!");
  } else {
    patient.Doctors.push(req.body._id);
    await patient.save();
    let doctor = await Doctor.findById(req.body._id);
    doctor.Patients.push(req.params.id);
    await doctor.save();
    res.send(patient);
  }
});


router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const patient = await Eng.findByIdAndUpdate(req.params.id,
    { 
      ssn: req.body.ssn,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      Dep_phone_number: req.body.Dep_phone_number,
      password: req.body.password,
      history: req.body.history,
      entryDate: req.body.entryDate,
      exitDate: req.body.exitDate,

    }, { new: true });

    if (!patient) return res.status(404).send('The patient with the given ID was not found.');
  
  res.send(patient);
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


router.get("/",async (req, res) => {
  const patients = await Patient.find({}) ;
  res.render('frontend page',{patients:patients})
  res.send(patients);
});

router.get("/:id",async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).send("The patient with the given ID was not found.");
  res.send(patient);
});
module.exports = router;
