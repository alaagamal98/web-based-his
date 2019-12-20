const Joi = require('joi');
const mongoose = require("mongoose");

// Nurse Schema
const Nurse = mongoose.model('Nurse', new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    last_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    ssn: {
      type: String,
      required: true,
      unique: true,
      minlength: 14,
      maxlength: 14
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
    phone_number: {
      type: [{ type: Number }], // array of numbers
      required: true
    },
    password: {
      type: String,
      required: true
    },
    Medicine: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }]
    },
    Patients: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }]
    },
    Room: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }]
    }
  }));

  
  function validateNurse(nurse) {
    const schema = {
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
      gender: Joi.string().required(),
      salary: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phone_number: Joi.number().min(11).required(),
      password: Joi.string().min(0).required()
    };
  
    return Joi.validate(nurse, schema);
  }


exports.Nurse = Nurse; 
exports.validate = validateNurse;