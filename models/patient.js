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
  firstName: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 12
  },
  
  lastName: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 12
  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  Dep_phone_number: {
    type: [{ type: Number }],
    required: true,
    minlenght: 11
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

  Medicine:{
    type:mongoose.Schema.Types.ObjectId,
      ref:'Medicine',
    date: {
      type:[ Date],
      required: true
  },
  dose: {
      type: String,   
      required: true
  },
  price: {
    type: Number,
    required: true  
   },
   quantity:{
    type:Number,
    required: true
   }
  },
  Nurse:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Nurse',
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
  },
},
  Doctor:{
    type:mongoose.Schema.Types.ObjectId,
      ref:'Doctor',
    firstName:{ 
      type: String,
      required: true,
      minlenght: 2,
      maxlenght: 12
    },
    
    lastName:{ 
      type: String,
      required: true,
      minlenght: 2,
      maxlenght: 12
    },
  }
 
  });
  
  


    
    patientSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  return token;
}
// Define a schema
const Patient = mongoose.model('Patient', patientSchema);


function validatePatient(patient) {
  const schema =Joi.object().keys({
    //de al data ali h5lii user ed5lha
    PatientSsn:Joi.string()
    .required()
    //.unique()
    .lenght(14),
    PatientfirstName: Joi.string()
    .required()
    .min(2)
    .max(12),
    PatientlastName: Joi.string()
    .required()
    .min(2)
    .max(12),
    PatientEmail: Joi.String()
    .required(),
    //.unique(),
    PatientGender: Joi.string()
    .required()
    .enum(),
    PatientDep_phone_number :Joi.string()
    .required()
    .min(11),
    PatientPassword: Joi.string()
    .required()
    .lenght(8),
    //.unique(),
    PatientHistory: Joi.String()
    .required(),
    PatientEntrydate: Joi.date()
    .required(),
    PatientExitdate: Joi.date()
    .required()
  });

  return Joi.validate(patient, schema);
}


exports.Patient = Patient; 
exports.validate = validatePatient;

// To add additional functionality to schema
//PatientSchema.plugin(uniqueValidator);

// Compile our model
//const Patient = (module.exports = mongoose.model("Patient", PatientSchema));
