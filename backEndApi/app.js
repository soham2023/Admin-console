const express = require("express");
require('dotenv').config(); // Load environment variables from .env file
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
app.use('/api', storeRoutes);
app.use('/api', productRoutes);

// Start the server
const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
