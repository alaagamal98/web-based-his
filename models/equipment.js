const Joi = require('joi');
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
      type: Boolean
    }
  }));

  
  function validateEquipment(equipment) {
    const schema = {
      equipment_name: Joi.string().required(),
      code: Joi.string().required(),
      status: Joi.boolean().required(),
      maintanince_date: Joi.date().required()
    };
  
    return Joi.validate(equipment, schema);
  }
  

exports.Equipment = Equipment; 
exports.validate = validateEquipment;