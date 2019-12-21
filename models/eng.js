const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");

// Eng Schema
const Eng = mongoose.model(
  "Eng",
   new mongoose.Schema({
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
      enum: ['Male','Female']
    },
    salary: {
      type: Number,
      required: true
    },
    phone_number: {
      type: [{ type: Number }], // array of numbers
      required: true,
      minlength:11
    },
    password: {
      type: String,
      minlength:(8),
      required: true,
      unique: true
     
    },
    Room:{
      type:mongoose.Schema.Types.ObjectId,
       ref:'Room',
      numberOfEquipment :{
        type:Number,
        required: true
    },
    nameOfEquipment:{
        type: [String],
        required: true
    }
    },
    Equipment:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Equipment'
    },
    Manger: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Manger',
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
      email: {
        type: String,
        required: true,
        unique: true
      },
    }
  }));

  function validateEng(eng) {
    const schema = Joi.object().keys({
      firstName: Joi.string()
      .min(2)
      .max(50)
      .required(),
      lastName: Joi.string()
      .min(2)
      .max(50)
      .required(),
      ssn: Joi.String()
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
      .required()
    })
    
  
    return Joi.validate(eng, schema);
  };
  

  
// To add additional functionality to schema


exports.Eng = Eng; 
exports.validate = validateEng;
  