const Order = require('../models/Order.js');
const Product = require('../models/Product.js');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer','name','address').populate('productDetails.product');
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer','name','address').populate('productDetails.product');
        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        res.status(200).json({
            success: true,
            count: order ? 1 : 0,
            data: order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const { customer, productDetails } = req.body;

        let totalAmount = 0;

        for (const item of productDetails) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            if (product.qtyOnHand < item.quantity) {
                return res.status(404).json({
                    success: false,
                    message: `Insufficient quantity for product ${product.description}`
                });
            }
            item.price = product.unitPrice;
            totalAmount += product.unitPrice * item.quantity;

            // Update the product quantity
            product.qtyOnHand -= item.quantity;
            await product.save();
        }
        const order = await Order.create({ customer, productDetails, totalAmount });
        res.status(201).json({
            success: true,
            data: order
        });

        const populatedOrder = await Order.findById(order._id)
        .populate('customer','name','address')
        .populate('productDetails.product', 'description unitPrice');

        res.status(201).json({
            success: true,
            data: populatedOrder
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        if(req.body.productDetails) {
            for (const item of req.body.productDetails) {
                const product = await Product.findById(item.product);
                product.qtyOnHand += item.quantity;
                await product.save();
            }
        let totalAmount = 0;
        for (const item of req.body.productDetails) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }
            item.price = product.unitPrice;
            totalAmount += product.unitPrice * item.quantity;

            // Update the product quantity
            product.qtyOnHand -= item.quantity;
            await product.save();
        }

        req.body.totalAmount = totalAmount;
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { ...req.body, totalAmount }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: updatedOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Restore the product quantities
        for (const item of order.productDetails) {
            const product = await Product.findById(item.product);
            if (product) {
                product.qtyOnHand += item.quantity;
                await product.save();
            }
        }
        await order.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Order deleted'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
};
