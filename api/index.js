const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');

//load env variables
dotenv.config();

//connect to database
connectDB();

const app = express();

//Body parsermiddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Enable CORS
app.use(cors());
