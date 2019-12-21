const {Eng, validateEng} = require('../models/eng.js'); 
const {Manger, validateManger} = require('../models/manger.js');
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


async function getMangers() {
  return await Manger;
}


app.get('/', (req, res) => {
	const mangers = getDoctors();
  res.send(mangers);
});


app.get('/:ssn', (req, res) => {
	const mangers = getMangers();
  const manger = mangers.find(c => c.ssn === parseInt(req.params.ssn));
  if (!manger) return res.status(404).send('The manger with the given SSN was not found.');
  res.send(manger);
});





module.exports = router;