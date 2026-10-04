const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, deleteProduct, updateProduct } = require('../controllers/productController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(protect, getProducts).post(protect, createProduct);
router.route('/:id').get(protect, getProduct).put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
