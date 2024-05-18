const express = require("express");
const app = express();

// Import routes
const adminRoute = require('./routes/adminRoute');
const productRoutes = require('./routes/productRoutes')

// Middleware
app.use(express.json());

// Routes
app.use('/api', adminRoute);
app.use('/api', productRoutes);

module.exports = app;
