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


async function getNurses() {
  return await Nurse;
}


app.get('/', (req, res) => {
	const nurses = getNurses();
  res.send(nurses);
});


app.get('/:ssn', (req, res) => {
	const nurses = getNurses();
  const nurse = nurses.find(c => c.ssn === parseInt(req.params.ssn));
  if (!nurse) return res.status(404).send('The nurse with the given SSN was not found.');
  res.send(nurse);
});





module.exports = router;