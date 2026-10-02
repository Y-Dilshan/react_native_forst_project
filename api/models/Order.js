const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'please add the customer'],
    },
    date:{
        type: Date,
        default: Date.now,
        required: [true, 'please add the date'],
    },
    totalAmount: {
        type: Number,
        required: [true, 'please add the total amount'],
        min: [0, 'Total amount must be greater than or equal to 0'],
    },
    productDetails: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'please add the product'],
        },
        quantity: {
            type: Number,
            required: [true, 'please add the quantity'],
            min: [1, 'Quantity must be a positive integer'],
        },
        price: {
            type: Number,
            required: [true, 'please add the price'],
            min: [0, 'Price must be greater than or equal to 0'],
        },
    }]}, {timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);