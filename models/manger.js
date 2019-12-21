const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");

// Manger Schema
const Manger = mongoose.model('Manger', new mongoose.Schema({
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

    
  }));
  
  function validateManger(manger) {
    const schema = {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      ssn: Joi.String().required().unique().length(14),
      email: Joi.string().required().unique(),
      gender: Joi.string().required().enum(),
      salary: Joi.Number().required(),
      phone_number: Joi.number().min(11).required(),
      password: Joi.string().min(8).required().unique()
    };
  
    return Joi.validate(manger, schema);
  }
  

  
exports.Manger = Manger; 
exports.validate = validateManger;