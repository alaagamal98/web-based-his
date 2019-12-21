const Joi = require('joi');
const mongoose = require("mongoose");

// Manger Schema
const Manger = mongoose.model('Manger', new mongoose.Schema({
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
    Doctor: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }]
    },
    Eng:{
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Eng" }]
    },
    Nurse:{
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nurse" }]
    }
  }));
  
  function validateManger(manger) {
    const schema = {
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
      gender: Joi.string().required(),
      salary: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phone_number: Joi.number().min(11).required(),
      password: Joi.string().min(0).required()
    };
  
    return Joi.validate(manger, schema);
  }
  

  
exports.Manger = Manger; 
exports.validate = validateManger;