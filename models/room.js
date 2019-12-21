const Joi = require('joi');
Joi.objectId= require('joi-objectid')(Joi);
const mongoose = require("mongoose");

const Room = mongoose.model('Room', new mongoose.Schema({
    vacancyOfRoom:{
        type: String,
        requied: true,
        enum:['Empty', 'Full']
    },
    
    numberOfEquipment :{
        type:Number,
        required: true
    },

    nameOfEquipment:{
        type: [String],
        required: true
    }
}));

function validateRoom(room) {
    const schema = {
        //de al data ali h5lii user ed5lha
        RoomvacancyOfRoom: Joi.Boolean().required(),
        RoomnumberOfEquipment: Joi.Number().required(),
        RoomnameOfEquipment: Joi.String([]).required(),
       
    };
    
    return Joi.validate(room, schema);
    }
    
    
    exports.Room = Room; 
    exports.validate = validateRoom;
    