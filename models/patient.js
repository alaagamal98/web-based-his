const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Define a schema
const PatientSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  ssn: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone_number: {
    type: [Number],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  doctors: {
    type: [{ type: Schema.Types.ObjectId, ref: "Doctor" }]
  }
  // not complete
});

// To add additional functionality to schema
schema.plugin(uniqueValidator);

// Compile our model
const Patient = (module.exports = mongoose.model("Patient", PatientSchema));
