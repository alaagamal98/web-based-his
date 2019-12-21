<<<<<<< HEAD
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
=======
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
>>>>>>> 001ef18d7ca67fd02a0c608f0967e2acf288e525
const mongoose = require("mongoose");

// Define a schema
<<<<<<< HEAD
const doctorSchema =new mongoose.Schema({
  // number: {
  //   type: Number,
  //   required: true,
  //   unique: true
  // },
  ssn: {
    type: String,
    required: true,
    unique: true,
    lenght: 14
  },
  title:{
    type:String,
    required : true
  },
  first_name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 12
  },
  
  last_name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 12
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
  phone_number: { //number wla string??
    type: [{ type: Number}], // array of numbers
    required: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    unique:true
  }
});


doctorSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
  return token;
}

const Doctor = mongoose.model('Doctor', doctorSchema);
=======
const Doctor = mongoose.model(
  "Doctor",
  new mongoose.Schema({
    ssn: {
      type: String,
      required: true,
      unique: true,
      length: 14
    },
    title: {
      type: String,
      required: true
    },
    first_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 12
    },

    last_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 12
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
      //number wla string??
      type: [{ type: Number }], // array of numbers
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      unique: true
    }
  })
);
>>>>>>> 001ef18d7ca67fd02a0c608f0967e2acf288e525

function validateDoctor(doctor) {
  const schema = Joi.object().keys({
    //de al data ali h5lii user ed5lha
<<<<<<< HEAD
    ssn:Joi.String().required().unique().lenght(14),
    title: Joi.String().required(),
    first_name: Joi.String().required().minlenght(2).maxlenght(12),
    last_name: Joi.String().required().minlenght(2).maxlenght(12),
    email: Joi.String().required(),
    gender: Joi.String().required(),
    salary: Joi.Number().required(),
    phone_number :Joi.Number([]).required(),
    password: Joi.String().required().minlenght(8).unique()
  };
=======
    ssn: Joi.string()
      .required()
      // .unique()
      .min(14),
    title: Joi.string().required(),
    first_name: Joi.string()
      .required()
      .min(2)
      .max(12),
    last_name: Joi.string()
      .required()
      .min(2)
      .max(12),
    email: Joi.string().required(),
    gender: Joi.string().required(),
    salary: Joi.number().required(),
    // phone_number: Joi.number([]).required(),
    phone_number: Joi.number().required(),
    password: Joi.string()
      .required()
      .min(8)
    // .unique()
  });
>>>>>>> 001ef18d7ca67fd02a0c608f0967e2acf288e525

  return Joi.validate(doctor, schema);
}

exports.Doctor = Doctor;
exports.validateDoctor = validateDoctor;
