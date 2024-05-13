const express = require('express')
const app = express();
const userRoutes = require("./routes/userRoutes.js")

const connectDB = require("./config/db.js");

connectDB();

app.use(express.json());
app.use('/api/auth',userRoutes)

module.exports = app;