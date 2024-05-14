require('dotenv').config()
const express = require('express')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (_req, res) => {
  res.send("Pong");
});

const userRoutes = require('./routes/user.routes.js');

app.use('/api/v1/user', userRoutes);


app.all("*", (_req, res) => {
  res.status(404).send("OOPS!!! 404 Page Not Found");
});

module.exports = app
