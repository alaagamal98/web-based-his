const mongoose = require("mongoose");

// Define a schema
const PatientSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  ssn: {
    type: String,
    required: true
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
  }
  // not complete
});

// Compile our model
const Patient = (module.exports = mongoose.model("Patient", PatientSchema));
