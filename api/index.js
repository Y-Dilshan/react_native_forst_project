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

//Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

//Enable Routes
app.use('/api/v1/auth', require('./routes/authRoutes.js'));

//Root route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});