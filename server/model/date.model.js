const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const DateSchema = new mongoose.Schema({
    dateProject: {
        type: String,
        required: [true, "The option is required"],
        min: [3, 'The skill must have at least 3 characters'], 
        unique: true
    },
    status:{
        type:String //recibe el estado 
    },
    dueDate: {
        type: Date,
        required: [true],
    },
}, { timestamps: true });
module.exports.Date = mongoose.model('Date', DateSchema);
