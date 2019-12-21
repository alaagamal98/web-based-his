const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");

// Nurse Schema
const Nurse = mongoose.model('Nurse', new mongoose.Schema({
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
      enum: ['Male', 'Female']
    },
    salary: {
      type: Number,
      required: true
    },
    phone_number: {
      type: [{ type: Number }], // array of numbers
      required: true,
      minlenght: 11
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlenght: 8
    },

    Doctor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Doctor',
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
      phone_number: { //number wla string??
        type: [{ type: Number}], // array of numbers
        required: true
      },
    },
    Manger:{
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
    },
    Room:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Room',
      vacancyOfRoom:{
        type: String,
        requied: true,
        enum:['Empty', 'Full']
    },
  },
  Patient:{ 
    type:mongoose.Schema.Types.ObjectId,
      ref:'Patient',
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
    Dep_phone_number: {
      type: [{ type: Number }],
      required: true
    },
    Medicine:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Medicine',
      name:{
        type:[String],
        required: true
    },
    date: {
      type:[ Date],
      required: true
  },
  dose: {
      type: String,   
      required: true
  },
  replacements:{ 
    type:[String],
    required:true
}
    },
    Equipment:{      
      type:mongoose.Schema.Types.ObjectId,
      ref:'Equipment',
      sterileDates:{
        type:Date,
        required: true
      },
      sterileOperation:{
        type: String,
        require:true
        }
    },
  }
    
  }));

  
  function validateNurse(nurse) {
    const schema = {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      ssn: Joi.string().required().unique().length(14),
      email: Joi.string().required().unique(),
      gender: Joi.string().required().enum(),
      salary: Joi.Number().required(),
      phone_number: Joi.number([]).min(11).required(),
      password: Joi.string().min(8).required().unique()
    };
  
    return Joi.validate(nurse, schema);
  }


exports.Nurse = Nurse; 
exports.validate = validateNurse;