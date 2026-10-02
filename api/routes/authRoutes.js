const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.js');
const { signup, login, getMe } = require('../controllers/authController.js');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;