const express = require("express");
const { createData, getData, updateData, deleteData } = require("../controller/authController.js");
const upload = require("../middleware/upload.js");

const userRoutes = express.Router();

userRoutes.post('/createdata', createData);
userRoutes.get('/getdata', getData);
userRoutes.put('/updatedata/:productName', updateData);
//userRoutes.post('/createdata', upload.single('image'), createData);
userRoutes.delete('/deletedata/:productName', deleteData); 

module.exports = userRoutes;