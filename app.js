const express = require('express')
const app = express();

const connectDB = require("./config/db.js");

connectDB();

app.use(express.json());

module.exports = app;