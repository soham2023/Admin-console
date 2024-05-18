const express = require('express');
const router = express.Router();
const storeController = require('../controllers/adminController');
const multer = require('multer');

// Multer setup for file uploads
const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 } // 500KB limit
});

// Route for creating a new store record
router.post('/store', uploader.single('file'), (req, res, next) => {
    console.log('File:', req.file); // Log file details
    console.log('Body:', req.body); // Log other form data
    next(); // Pass control to the storeController
}, storeController.createRecord);

// Other routes
router.get('/store', storeController.getAllRecords);
router.get('/store/:id', storeController.getRecordById);
router.put('/store/:id', storeController.updateRecord);
router.delete('/store/:id', storeController.deleteRecord);

module.exports = router;
