
const express = require('express');
const router = express.Router();
const {Patient, validatePatient} = require('../models/patient');



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