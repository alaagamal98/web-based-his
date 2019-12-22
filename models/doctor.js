const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

// Define a schema
const doctorSchema = new mongoose.Schema({
  ssn: {
    type: String,
    required: true,
    unique: true,
    lenght: 14
  },
  title: {
    type: String,
    required: true
  },
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
  email: {
    type: String,
    required: true,
    unique: true,
    minlenght: 2,
    maxlenght: 12
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
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
    minlenght: 8
  },

  Patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
      // firstName: {
      //   type: String,
      //   required: true
      // },
      // email: {
      //   type: String,
      //   required: true
      // },
      // password: {
      //   type: String,
      //   required: true,
      //   minlenght: 8,
      //   unique: true
      // },
      // history: {
      //   type: String,
      //   required: true
      // },
      // gender: {
      //   type: String,
      //   required: true,
      //   enum: ["Male", "Female"]
      // }
    }
  ],
  Medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    name: {
      type: [String],
      required: true
    },
    dose: {
      type: String,
      required: true
    },
    replacements: {
      type: [String],
      required: true
    }
  },
  Manger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manger",

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
    Room: {
      // msh mot2kda de t5os dr wla la2??

      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      vacancyOfRoom: {
        type: String,
        requied: true,
        enum: ["Empty", "Full"]
      }
    }
  }
});

//doctorSchema.methods.generateAuthToken = function() {
//  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
// return token;
//};

const Doctor = mongoose.model("Doctor", doctorSchema);

function validateDoctor(doctor) {
  const schema = Joi.object().keys({
    //de al data ali h5lii user ed5lha
    ssn: Joi.string()
      .required()
      // .unique()
      .min(14),
    title: Joi.string().required(),
    firstName: Joi.string()
      .required()
      .min(2)
      .max(12),
    lastName: Joi.string()
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
