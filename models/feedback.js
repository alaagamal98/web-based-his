const Joi = require('joi');
const mongoose = require("mongoose");
const Feedback = mongoose.model('Feedback', new mongoose.Schema({

    comments :{
        type:String
    }
}));
  
function validateFeedback(feedback) {
  const schema = {
    
    comments: Joi.string()
  };

  return Joi.validate(feedback, schema);
}



exports.Feedback = Feedback; 
exports.validate = validateFeedback;




