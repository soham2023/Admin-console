const express = require("express");
const app = express();

// Import routes
const adminRoute = require('./routes/adminRoute');

// Middleware
app.use(express.json());

// Routes
app.use('/api', adminRoute);

module.exports = app;
