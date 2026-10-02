const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.js');
const { registerUser, loginUser, getMe } = require('../controllers/authController.js');