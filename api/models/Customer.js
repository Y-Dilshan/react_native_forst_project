const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add the name'],
        trim: true,
    },
    address : {
        type: String,
        required: [true, 'Please add an address'],
    },
    salary: {
        type: String,
        required: [true, 'Please add a salary'],
    }
}, {timestamps: true});

module.exports = mongoose.model('Customer', customerSchema);