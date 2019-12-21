const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

// Define a schema
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

function validateDoctor(doctor) {
  const schema = Joi.object().keys({
    //de al data ali h5lii user ed5lha
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

  return Joi.validate(doctor, schema);
}

exports.Doctor = Doctor;
exports.validateDoctor = validateDoctor;
