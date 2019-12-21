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



async function getPatients() {
  return await Patient;
}


router.get('/', (req, res) => {
	const patients = getPatients();
  res.send(patients);
});


router.get('/:ssn', (req, res) => {
	const patients = getPatients();
  const patient = patients.find(c => c.ssn === parseInt(req.params.ssn));
  if (!patient) return res.status(404).send('The patient with the given SSN was not found.');
  res.send(patient);
});




module.exports = router;