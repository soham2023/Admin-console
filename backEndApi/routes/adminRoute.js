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
router.post('/store', uploader.single('file'), storeController.createRecord);

// Route for retrieving all store records
router.get('/store', storeController.getAllRecords);

// Route for retrieving a specific store record by ID
router.get('/store/:id', storeController.getRecordById);

// Route for updating a store record by ID
router.put('/store/:id', storeController.updateRecord);

// Route for deleting a store record by ID
router.delete('/store/:id', storeController.deleteRecord);

module.exports = router;
