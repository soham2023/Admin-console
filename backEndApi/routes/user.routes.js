const express = require('express');

const{createData,getData,updateData,deleteData} = require('../controllers/user.Controller.js');

const router = express.Router();

router.post('/createdata',createData);
router.get('/getdata',getData);
router.put('/updatedata',updateData);
router.delete('/deletedata',deleteData);

module.exports = router;