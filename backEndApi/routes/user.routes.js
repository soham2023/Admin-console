const express = require('express');

const{createUser,getData,updateData,deleteData} = require('../controllers/user.controller.js');

const router = express.Router();

router.post('/createuser',createUser);
//router.get('/getdata',getData);
//router.put('/updatedata',updateData);
//router.delete('/deletedata',deleteData);

module.exports = router;