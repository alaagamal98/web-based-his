const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Define a schema
const DoctorSchema = mongoose.Schema({
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
    type: [Number], // array of numbers
    required: true
  },
  password: {
    type: String,
    required: true
  },
  patients: {
    type: [{ type: Schema.Types.ObjectId, ref: "Patient" }]
  }
});

// To add additional functionality to schema
schema.plugin(uniqueValidator);

// Compile our model
const Doctor = (module.exports = mongoose.model("Doctor", DoctorSchema));
