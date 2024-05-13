require('dotenv').config();
const express = require('express');
const cors = require("cors")

const connectToDb = require('./config/db.js')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

connectToDb()

const userRoutes = require('./routes/userRoutes.js')

app.use('/',userRouters)

module.exports = app;