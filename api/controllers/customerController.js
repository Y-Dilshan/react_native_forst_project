const Customer = require('../models/Customer');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Public
const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json({
            success: true,
            count: customer ? 1 : 0,
            data: customer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};