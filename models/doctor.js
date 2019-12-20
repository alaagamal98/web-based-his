const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Define a schema
const DoctorSchema = mongoose.Schema({
  // number: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  ssn: {
    type: String,
    required: true,
    unique: true,
    lenght: 14
  },
  title:{
    type:String,
    required : true
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
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  phone_number: { //number wla string??
    type: [{ type: Number}], // array of numbers
    required: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    unique:true
  },
  patients: { // msh hna mfrod tkon patient ??
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }]
  },
  manager: { // same??
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Manager" }]
  },
  medicine: {// same??
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }]
  }
});

function validateDoctor(doctor) {
  const schema = {
    //de al data ali h5lii user ed5lha
    DoctorSsn:Joi.String().required().unique().lenght(14),
    Doctortitle: Joi.String().required(),
    Doctorfirst_name: Joi.String().required().minlenght(2).maxlenght(12),
    Doctorlast_name: Joi.String().required().minlenght(2).maxlenght(12),
    DoctorEmail: Joi.String().required(),
    DoctorGender: Joi.String().required(),
    DoctorSalary: Joi.Number().required(),
    DoctorPhone_number :Joi.Number([]).required(),
    DoctorPassword: Joi.String().required().minlenght(8).unique()
  };

  return Joi.validate(doctor, schema);
}


exports.Doctor = DoctorSchema; 
exports.validate = validateDoctor;


// To add additional functionality to schema
//DoctorSchema.plugin(uniqueValidator);

// Compile our model
//const Doctor = (module.exports = mongoose.model("Doctor", DoctorSchema));
