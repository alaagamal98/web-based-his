const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
  
  ssn: {
    type: String,
    required: true,
    unique: true,
    lenght: 14
  },
  first_name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 12
  },
  
  last_name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 12
  },
  email: {
    type: String,
    required: true

  },
  gender: {
    type: String,
    required: true
  },
  Dep_phone_number: {
    type: [{ type: Number }],
    required: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    unique:true
  },
  history:{
    type:String,
    required:true,
  },
  enteryDate:{
    type:Date,
    required: true
  },
  exitDate:{
    type:Date,
    required: true
  },
  doctors: {  //same??
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }]
  },
  medicine: {//same??
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }]
  },
  
  // not complete
})

    
    patientSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  return token;
}
// Define a schema
const Patient = mongoose.model('Patient', patientSchema);
// movie: {
//   type: new mongoose.Schema({
//     title: {
//       type: String,
//       required: true,
//       trim: true, 
//       minlength: 5,
//       maxlength: 255
//     },

function validatePatient(patient) {
  const schema = {
    //de al data ali h5lii user ed5lha
    ssn:Joi.String().required().unique().lenght(14),
    first_name: Joi.String().required().minlenght(2).maxlenght(12),
    last_name: Joi.String().required().minlenght(2).maxlenght(12),
    email: Joi.String().required(),
    gender: Joi.String().required(),
    Dep_phone_number :Joi.String([]).required(),
    password: Joi.String().required().lenght(8).unique(),
    history: Joi.String().required(),
  };

  return Joi.validate(patient, schema);
}


exports.Patient = Patient; 
exports.validate = validatePatient;

// To add additional functionality to schema
//PatientSchema.plugin(uniqueValidator);

// Compile our model
//const Patient = (module.exports = mongoose.model("Patient", PatientSchema));
