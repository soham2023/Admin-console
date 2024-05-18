const express = require('express');// Load environment variables from .env file
const connectToDatabase = require("./config/dbconn");

const app = express();

// Import routes
const storeRoutes = require('./routes/storeRoutes'); // Correct the import name
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
//app.use('/api', storeRoutes);
app.use('/api', productRoutes);

module.exports = app;
