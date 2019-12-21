const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");

const mangerSchema = new mongoose.Schema({
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
    ssn: {
      type: String,
      required: true,
      unique: true,
      length: 14
      
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true,
      enum:['Male','Female']
    },
    salary: {
      type: Number,
      required: true
    },
    phone_number: {
      type: [{ type: Number }], // array of numbers
      required: true,
      minlength: 11
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      unique: true
    },

    Doctor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Doctor'
    },
    Nurse:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Nurse',
      
    },
    Eng:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Eng',
    
    },
    Feedback:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Feedback'
    }
  })
  
    mangerSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  return token;
}

// Manger Schema
const Manger = mongoose.model('Manger', mangerSchema);
  
  function validateManger(manger) {
    const schema =Joi.object().keys({
      firstName: Joi.string()
      .min(2)
      .max(50)
      .required(),
      lastName: Joi.string()
      .min(2)
      .max(50)
      .required(),
      ssn: Joi.string()
      .required()
      //.unique()
      .length(14),
      email: Joi.string()
      .required(),
      //.unique(),
      gender: Joi.string()
      .required()
      .enum(),
      salary: Joi.number()
      .required(),
      phone_number: Joi.number()
      .min(11)
      .required(),
      password: Joi.string()
      .min(8)
      .required(),
      //.unique()
    });
  
    return Joi.validate(manger, schema);
  }
  

  
exports.Manger = Manger; 
exports.validate = validateManger;