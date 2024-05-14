const express = require('express');

const{createData,getData,updateData,deleteData} = require('../controllers/user.Controller.js');

const router = express.Router();

router.post('/createData',createData);
router.get('/getData',getData);
router.put('/updateData',updateData);
router.delete('/deleteData',deleteData);

module.exports = router;