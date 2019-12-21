const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");
// Define a schema
const doctorSchema =new mongoose.Schema({
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
  }
});


doctorSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  return token;
}

const Doctor = mongoose.model('Doctor', doctorSchema);

function validateDoctor(doctor) {
  const schema = {
    //de al data ali h5lii user ed5lha
    ssn:Joi.String().required().unique().lenght(14),
    title: Joi.String().required(),
    first_name: Joi.String().required().minlenght(2).maxlenght(12),
    last_name: Joi.String().required().minlenght(2).maxlenght(12),
    email: Joi.String().required(),
    gender: Joi.String().required(),
    salary: Joi.Number().required(),
    phone_number :Joi.Number([]).required(),
    password: Joi.String().required().minlenght(8).unique()
  };

  return Joi.validate(doctor, schema);
}


exports.Doctor = Doctor; 
exports.validate = validateDoctor;


// To add additional functionality to schema
//DoctorSchema.plugin(uniqueValidator);

// Compile our model
//const Doctor = (module.exports = mongoose.model("Doctor", DoctorSchema));
