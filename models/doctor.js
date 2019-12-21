const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");
// Define a schema
const Doctor = mongoose.model('Doctor', new mongoose.Schema({
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
    unique: true
  },
  gender: {
    type: String,
    required: true,
    enum:['Male','Female']
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
  },
  
  Patient :{
    type:mongoose.Schema.Types.ObjectId,
       ref:'Patient',
       firstName:{
         type:String,
         required:true
       },
       email:{
        type: String,
        required:true
       }, 
       password:{
        type: String,
        required:true,
        minlenght:8,
        unique: true
       },
       history:{
        type: String,
        required:true 
       },
       gender:{
        type: String,
        required: true,
        enum:['Male','Female']
       }
  },

   Medicine:{
    type:mongoose.Schema.Types.ObjectId,
       ref:'Medicine',
    name:{
      type:[String],
        required: true
    },
    dose: {
      type: String,   
      required: true
  },
  replacements:{ 
    type:[String],
    required:true
  }
  },
  Manger:{
    type:mongoose.Schema.Types.ObjectId,
       ref:'Manger',
   
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

  },
   Room:{  // msh mot2kda de t5os dr wla la2??
    
    type:mongoose.Schema.Types.ObjectId,
    ref:'Room',      
    vacancyOfRoom:{
      type: String,
      requied: true,
      enum:['Empty', 'Full']
  }
  }
 }));


function validateDoctor(doctor) {
  const schema = {
    //de al data ali h5lii user ed5lha
    DoctorSsn:Joi.String().required().unique().lenght(14),
    Doctortitle: Joi.String().required(),
    DoctorfirstName: Joi.String().required().minlenght(2).maxlenght(12),
    DoctorlastName: Joi.String().required().minlenght(2).maxlenght(12),
    DoctorEmail: Joi.String().required(),
    DoctorGender: Joi.String().required(),
    DoctorSalary: Joi.Number().required(),
    DoctorPhone_number :Joi.Number([]).required(),
    DoctorPassword: Joi.String().required().minlenght(8).unique()
  };

  return Joi.validate(doctor, schema);
}


exports.Doctor = Doctor; 
exports.validate = validateDoctor;


// To add additional functionality to schema
//DoctorSchema.plugin(uniqueValidator);

// Compile our model
//const Doctor = (module.exports = mongoose.model("Doctor", DoctorSchema));
