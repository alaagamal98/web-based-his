const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");


// Equipment Schema
const Equipment = mongoose.model('Equipment', new mongoose.Schema({
    equipment_name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    maintanince_date:{
      type: Date,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    sterileDates:{
      type:Date,
      required: true
    },
    sterileOperation:{
      type: String,
      require:true
      }
    }));

  
  function validateEquipment(equipment) {
    const schema = {
      equipment_name: Joi.string().required(),
      code: Joi.string().required().unique(),
      maintanince_date: Joi.date().required(),
      status: Joi.boolean().required(),
      sterileDates: Joi.date().required(),
    sterileOperation:Joi.string().required()
  };
    return Joi.validate(equipment, schema);
  }
  

exports.Equipment = Equipment; 
exports.validate = validateEquipment;