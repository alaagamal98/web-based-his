const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt =  require("bcryptjs")
const _ = require("lodash");
const Joi = require("joi");
//const config = require("config");
//const jwt = require("jsonwebtoken")

const {Eng} = require('../models/eng.js'); 
const {Manger} = require('../models/manger.js');
const {Nurse} = require('../models/nurse');
const {Doctor} = require('../models/doctor');
const {Patient} = require('../models/patient');


//login_doc:

router.post("/acess", async (req, res) => {

    // Validate The Request
   
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let doctor = await Doctor.findOne({ email : req.body.email });
    let manger = await Manger.findOne({ email : req.body.email });
    let nurse = await Nurse.findOne({ email : req.body.email });
    let eng = await Eng.findOne({ email : req.body.email });
    let patient = await Patient.findOne({ email : req.body.email });
    if (!doctor && !manger && !nurse && !eng && !patient ) return res.status(400).send("Invalid mail or password!");

    if(doctor&& !manger && !nurse && !eng && !patient){
     const validPassword =  await bcrypt.compare(req.body.password, doctor.password)
     if(!validPassword) return res.status(400).send("Invalid mail or password!");

    res.send(req.body); 
    }
    else if(manger && !doctor && !nurse && !eng && !patient ){
     const validPassword =  await bcrypt.compare(req.body.password, manger.password)
     if(!validPassword) return res.status(400).send("Invalid mail or password!");

    res.send(req.body); 
    }
    else if (nurse&& !doctor && !manger && !eng && !patient){
    const validPassword =  await bcrypt.compare(req.body.password, nurse.password)
    if(!validPassword) return res.status(400).send("Invalid mail or password!");
   
    res.send(req.body);    
    }
    else if (eng && !doctor && !manger && !nurse && !patient ){
    const validPassword =  await bcrypt.compare(req.body.password, eng.password)
    if(!validPassword) return res.status(400).send("Invalid mail or password!");
       
     res.send(req.body);      
    }
    else if (patient  && !doctor && !manger && !nurse && !eng){
    const validPassword =  await bcrypt.compare(req.body.password, patient.password)
    if(!validPassword) return res.status(400).send("Invalid mail or password!");
       
     res.send(req.body);   
    }
    else{
        return;
    }
     next();
  });
  module.exports = router; 
//token = jwt.sign({_id: user._id},config.get('jwtprivatekey'));
//lazm   jwtpeivatekey ekon secret f nnzl config
// in config file :  {"jwtprivatekey:""}
// in custom-environment-variables.json :  {"jwtprivatekey":"doctor_jwtprivatekey"}
// res.send(doctor); //jwt decoder to decode al token ali zhr
 function validation(req){
      const schema = Joi.object().keys({
      email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
      password: Joi.string()
      .min(5)
      .max(1024)
      .required()
      })
      return Joi.validate(req,schema);
    };
    

































// const Joi = require('joi');
// const _ = require('lodash');
// const {Eng} = require('../models/eng.js'); 
// const {Manger} = require('../models/manger.js');
// const {Nurse} = require('../models/nurse');
// const {Doctor} = require('../models/doctor');
// const {Patient} = require('../models/patient');
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   let manger = await Manger.findOne({ email: req.body.email });
//   let doctor = await Doctor.findOne({ email: req.body.email });
//   let nurse = await Nurse.findOne({ email: req.body.email });
//   let eng = await Eng.findOne({ email: req.body.email });
//   let patient = await Patient.findOne({ email: req.body.email });

//   if (!manger && !doctor && !nurse && !eng && !patient) return res.status(400).send('Invalid email or password.');
 
// 	if (manger){

//   if (req.body.password != manger.password) return res.status(400).send('Invalid email or password.');

//   const token = manger.generateAuthToken();
//   res.send(token);
//   }
//   else if (doctor){

//   if (req.body.password != doctor.password) return res.status(400).send('Invalid email or password.');

//   //const token = doctor.generateAuthToken();
//   res.send(doctor);
//   }
//   else if (nurse){

//   if (req.body.password != nurse.password) return res.status(400).send('Invalid email or password.');

//   const token = nurse.generateAuthToken();
//   res.send(token);
//   }
//   else if (eng){

//   if (req.body.password != eng.password) return res.status(400).send('Invalid email or password.');

//   const token = eng.generateAuthToken();
//   res.send(token);
//   }
//   else if (patient){

//   if (req.body.password != patient.password) return res.status(400).send('Invalid email or password.');

//   const token = patient.generateAuthToken();
//   res.send(token);
//   }
  
// });

// function validate(req) {
//   const schema = {
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required()
//   };

//   return Joi.validate(req, schema);
// }

// module.exports = router; 
