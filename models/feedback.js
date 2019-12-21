const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");

//Define Schema
const Feedback = mongoose.model(
    "Feedback",
     new mongoose.Schema({

    comments :{
        type:String
    }
}));
  
function validateFeedback(feedback) {
  const schema =Joi.object().keys({
    
    comments: Joi.string()
  });

  return Joi.validate(feedback, schema);
};



exports.Feedback = Feedback; 
exports.validate = validateFeedback;




