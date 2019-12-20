const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// Define a schema
const MedicineSchema = mongoose.Schema({

    name:{
        type:[{String}],
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    date: {
        type:[{ Date}],
        required: true
    },
    dose: {
        type: String,   
        required: true
    },
    
    price: {
        type: Number,
        required: true  
    },

    replacements:{ 
        type:[{String}],
        required:true
    },

    patient: {  //same??
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }]
    },
    doctor: {//same??
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }]
    },
    nurse: {//same??
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nurse" }]
    },
    // not complete
    });
    
    function validateMedicine(medicine) {
    const schema = {
        //de al data ali h5lii user ed5lha
        MedicineDate: Joi.Date().required(),
        MedicineDose: Joi.String().required(),
        MedicinePrice: Joi.Number().required(),
       MedicineReplacements: Joi.String([]).required()
    };
    
    return Joi.validate(medicine, schema);
    }
    
    
    exports.medicine = MedicineSchema; 
    exports.validate = validateMedicine;
    
    // To add additional functionality to schema
    //MedicineSchema.plugin(uniqueValidator);
    
    // Compile our model
    //const PatientMedicine = (module.exports = mongoose.model("Medicine", MedicineSchema));
