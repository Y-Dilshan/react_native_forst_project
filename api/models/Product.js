const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'please add the description'],
        trim: true,
    },
    unitPrice:{
        type: Number,
        required: [true, 'please add the unit price'],
        min: [0, 'Unit price must be greater than or equal to 0'],
    },
    qtyOnHand: {
        type: Number,
        required: [true, 'please add the quantity on hand'],
        min: [0, 'Quantity on hand must be greater than or equal to 0'],
        default: 0,
    },
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);