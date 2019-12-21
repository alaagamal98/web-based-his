const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require("mongoose");

const engSchema =new mongoose.Schema({
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
    }
  })
  
  engSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  return token;
}


// Eng Schema
const Eng = mongoose.model('Eng', engSchema);

  function validateEng(eng) {
    const schema = {
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
      gender: Joi.string().required(),
      salary: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phone_number: Joi.number().min(11).required(),
      password: Joi.string().min(0).required()
    };
  
    return Joi.validate(eng, schema);
  }
  
// To add additional functionality to schema


exports.Eng = Eng; 
exports.validate = validateEng;
  