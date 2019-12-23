
const bcrypt = require("bcryptjs");
const Joi = require('joi');
const _ = require('lodash');
const {Eng} = require('../models/eng.js'); 
const {Manger} = require('../models/manger.js');
const {Nurse} = require('../models/nurse');
const {Doctor} = require('../models/doctor');
const {Patient} = require('../models/patient');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));


router.post('/acess', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let manger = await Manger.findOne({ email: req.body.email });
  let doctor = await Doctor.findOne({ email: req.body.email });
  let nurse = await Nurse.findOne({ email: req.body.email });
  let eng = await Eng.findOne({ email: req.body.email });
  let patient = await Patient.findOne({ email: req.body.email });

  if (!manger && !doctor && !nurse && !eng && !patient) return res.status(400).send('Invalid email or password.');
 
	if (manger){

    const validPassword = await bcrypt.compare(req.body.password, manger.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

 // const token = manger.generateAuthToken();
  res.render("../ICU_Front_End/Managers/manager_page.html",{manger:manger});
  //res.send(manger);

  }
  else if (doctor){

    const validPassword = await bcrypt.compare(req.body.password, doctor.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  //const token = doctor.generateAuthToken();
  res.render("..\ICU_Front_End\Managers\Doctores\doc_page.html");

  //res.send(doctor);
  }
  else if (eng){

    const validPassword = await bcrypt.compare(req.body.password, eng.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

  //const token = eng.generateAuthToken();
  res.render("..\ICU_Front_End\Managers\Patients\pat_page.html");

  //res.send(token);
  }
  else if (nurse){


    const validPassword = await bcrypt.compare(req.body.password, nurse.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  
   // const token = nurse.generateAuthToken();
   res.render("..\ICU_Front_End\Managers\Nurses\nur_page.html");

    //res.send(token);
    }
  else if (patient){

    const validPassword = await bcrypt.compare(req.body.password, patient.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

 // const token = patient.generateAuthToken();
 res.render("..\ICU_Front_End\Managers\Engineers\eng_page.html");

  //res.send(token);
  }
  
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
