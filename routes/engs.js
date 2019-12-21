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



async function getEngs() {
  return await Eng;
}


router.get('/', (req, res) => {
	const engs = getDoctors();
  res.send(engs);
});


router.get('/:id', (req, res) => {
	const engs = getEngs();
  const eng = engs.find(c => c.id === parseInt(req.params.id));
  if (!eng) return res.status(404).send('The engineer with the given ID was not found.');
  res.send(eng);
});




module.exports = router;