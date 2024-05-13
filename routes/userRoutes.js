const express = require("express");
const { createData, getData, updateData, deleteData } = require("../controller/authController.js");

const userRoutes = express.Router();

userRoutes.post('/createdata', createData);
userRoutes.get('/getdata', getData);
userRoutes.put('/updatedata/:productName', updateData);
userRoutes.delete('/deletedata/:productName', deleteData); 

module.exports = userRoutes;