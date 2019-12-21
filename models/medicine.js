const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");

const Medicine = mongoose.model('Medicine', new mongoose.Schema({

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
    }
    }));
    
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
    
    
    exports.Medicine = Medicine; 
    exports.validate = validateMedicine;
    
    // To add additional functionality to schema
    //MedicineSchema.plugin(uniqueValidator);
    
    // Compile our model
    //const PatientMedicine = (module.exports = mongoose.model("Medicine", MedicineSchema));
