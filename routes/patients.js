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


router.get('/:id', (req, res) => {
	const patients = getPatients();
  const patient = patients.find(c => c.id === parseInt(req.params.id));
  if (!patient) return res.status(404).send('The patient with the given ID was not found.');
  res.send(patient);
});




module.exports = router;