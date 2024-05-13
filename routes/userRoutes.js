const express = require("express")

const {createData,getData,updateData,deleteData} = require("../controller/authController.js")


const router = express.Router()

router.post('/createData',createData)
router.get('/getData',getData)

router.put('/updateData/:id',updateData)
router.delete('/deleteData/:id',deleteData)

module.exports = router 