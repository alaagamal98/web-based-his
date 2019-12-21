const {Eng, validateEng} = require('../models/eng'); 
const {Manger, validateManger} = require('../models/manger');
const {Equipment, validateEquipment} = require('../models/equipment');
const {Nurse, validateNurse} = require('../models/nurse');
const {Doctor, validateDoctor} = require('../models/doctor');
const {Room, validateRoom} = require('../models/room');
const {Patient, validatePatient} = require('../models/patient');
const {Medicine, validateMedicine} = require('../models/medicine');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// routes 


async function getDoctors() {
  return await Doctor;
}


app.get('/', (req, res) => {
	const doctors = getDoctors();
  res.send(doctors);
});


app.get('/:ssn', (req, res) => {
	const doctors = getDoctors();
  const doctor = doctors.find(c => c.ssn === parseInt(req.params.ssn));
  if (!doctor) return res.status(404).send('The doctor with the given SSN was not found.');
  res.send(doctor);
});



module.exports = router;